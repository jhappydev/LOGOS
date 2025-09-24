import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  specialization: string;
  email: string;
  image: string;
  career: string[];
}

export default function AdminTeam() {
  const [form, setForm] = useState<TeamMember>({
    id: "",
    name: "",
    position: "",
    specialization: "",
    email: "",
    image: "",
    career: [],
  });
  const [careerInput, setCareerInput] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // 팀원 불러오기 (수정용)
  useEffect(() => {
    const fetchTeamMember = async () => {
      if (!form.id) return;
      const docRef = doc(db, "members", form.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data() as TeamMember);
      } else {
        setForm({
          id: form.id,
          name: "",
          position: "",
          specialization: "",
          email: "",
          image: "",
          career: [],
        });
      }
    };

    fetchTeamMember();
  }, [form.id]);

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

    let imageUrl = form.image;

    if (file) {
      const storageRef = ref(storage, `members/${form.id}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    await setDoc(doc(collection(db, "members"), form.id), {
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
    setForm({
      id: "",
      name: "",
      position: "",
      specialization: "",
      email: "",
      image: "",
      career: [],
    });
    setFile(null);
    alert("삭제 완료!");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">팀원 추가/수정</h2>
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

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
