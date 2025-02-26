<template>
  <div>
    <h2>게시글 작성</h2>
    <form @submit.prevent="submitPost">
      <label for="title">제목:</label>
      <input type="text" id="title" v-model="post.title" required />

      <label for="content">내용:</label>
      <textarea id="content" v-model="post.content" required></textarea>

      <label for="writer">작성자:</label>
      <input type="text" id="writer" v-model="post.writer" required />

      <button type="submit">등록</button>
      <button type="button" @click="goBack">취소</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const post = ref({
  title: "",
  content: "",
  writer: "",
});

const submitPost = async () => {
  try {
    await axios.post("/api/board/register", post.value);
    alert("게시글이 등록되었습니다.");
    router.push("/");
  } catch (error) {
    console.error("게시글 등록 중 오류 발생:", error);
    alert("게시글 등록에 실패했습니다.");
  }
};

const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
}

label {
  font-weight: bold;
  margin-top: 10px;
}

input,
textarea {
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 150px;
}

button {
  margin-top: 15px;
  padding: 10px 15px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button[type="submit"] {
  background-color: #007bff;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #dc3545;
  margin-top: 10px;
}

button[type="button"]:hover {
  background-color: #c82333;
}
</style>
