import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  specialization: string;
  email: string;
  image: string;
  career: string[];
}

const initialForm: TeamMember = {
  id: "",
  name: "",
  position: "",
  specialization: "",
  email: "",
  image: "",
  career: [],
};

export default function AdminTeam() {
  const [form, setForm] = useState<TeamMember>(initialForm);
  const [careerInput, setCareerInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedId, setSelectedId] = useState(""); // 조회용 ID

  // 팀원 불러오기 (수정용)
  useEffect(() => {
    if (!selectedId) return;

    const fetchTeamMember = async () => {
      const docRef = doc(db, "members", selectedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setForm(docSnap.data() as TeamMember);
      } else {
        setForm({ ...initialForm, id: selectedId });
      }
    };

    fetchTeamMember();
  }, [selectedId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCareer = () => {
    if (careerInput.trim()) {
      setForm({ ...form, career: [...form.career, careerInput.trim()] });
      setCareerInput("");
    }
  };

  const handleRemoveCareer = (index: number) => {
    setForm({
      ...form,
      career: form.career.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.id) return alert("ID를 입력해주세요.");

    let imageUrl = form.image;

    if (file) {
      const storageRef = ref(storage, `members/${form.id}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    await setDoc(doc(db, "members", form.id), {
      ...form,
      image: imageUrl,
    });

    alert("저장 완료!");
  };

  const handleDelete = async () => {
    if (!form.id) return alert("삭제할 팀원을 선택해주세요.");
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "members", form.id));

    if (form.image) {
      const storageRef = ref(storage, `members/${form.id}`);
      await deleteObject(storageRef).catch(() => {});
    }

    setForm(initialForm);
    setFile(null);
    setSelectedId("");
    alert("삭제 완료!");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">팀원 추가/수정</h2>

      {/* 조회용 ID 입력 */}
      <div className="mb-4">
        <input
          placeholder="조회할 팀원 ID"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full border p-2"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="id"
          placeholder="ID (고유값)"
          value={form.id}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="position"
          placeholder="직책"
          value={form.position}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="specialization"
          placeholder="전문 분야"
          value={form.specialization}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {/* 경력 입력 */}
        <div>
          <label>경력 추가</label>
          <div className="flex gap-2 mt-1">
            <input
              value={careerInput}
              onChange={(e) => setCareerInput(e.target.value)}
              className="flex-1 border p-2"
            />
            <button
              type="button"
              onClick={handleAddCareer}
              className="bg-blue-500 text-white px-3 rounded"
            >
              +
            </button>
          </div>
          <ul className="list-disc pl-5 mt-2">
            {form.career.map((c, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{c}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCareer(i)}
                  className="text-red-500 ml-2"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 이미지 업로드 + 미리보기 */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-24 h-24 object-cover mt-2 rounded"
            />
          )}
          {!file && form.image && (
            <img
              src={form.image}
              alt="current"
              className="w-24 h-24 object-cover mt-2 rounded"
            />
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            저장
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            삭제
          </button>
        </div>
      </form>
    </div>
  );
}
