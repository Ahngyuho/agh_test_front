<template>
  <div>
    <h2>{{ board.title }}</h2>
    <p><strong>작성자:</strong> {{ board.writer }}</p>
    <p>{{ board.content }}</p>

    <h3>댓글</h3>
    <ul>
      <li v-for="(comment, index) in board.comments" :key="index">
        {{ comment.comment }} - <strong>{{ comment.writer }}</strong>
      </li>
    </ul>

    <!-- 댓글 작성 폼 -->
    <h3>댓글 작성</h3>
    <form @submit.prevent="submitComment">
      <label for="writer">작성자:</label>
      <input type="text" id="writer" v-model="newComment.writer" required />

      <label for="content">내용:</label>
      <textarea id="content" v-model="newComment.content" required></textarea>

      <button type="submit">댓글 등록</button>
    </form>

    <button @click="goBack">목록으로</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const board = ref({ title: "", content: "", writer: "", comments: [] });

const newComment = ref({
  content: "",
  writer: "",
});

const fetchBoardDetail = async () => {
  try {
    const response = await axios.get(`/api/board/${route.params.idx}`);
    board.value = response.data;
  } catch (error) {
    console.error("게시글을 불러오는 중 오류 발생:", error);
  }
};

// 댓글 등록하기
const submitComment = async () => {
  if (!newComment.value.content.trim() || !newComment.value.writer.trim()) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }

  try {
    await axios.post(
      `/api/board/${route.params.idx}/comment/register`,
      newComment.value
    );
    alert("댓글이 등록되었습니다.");
    newComment.value.content = ""; // 입력 필드 초기화
    newComment.value.writer = "";
    fetchBoardDetail(); // 댓글 목록 갱신
  } catch (error) {
    console.error("댓글 등록 중 오류 발생:", error);
    alert("댓글 등록에 실패했습니다.");
  }
};
const goBack = () => {
  router.push("/");
};

onMounted(fetchBoardDetail);
</script>

<style scoped>
h2 {
  color: #333;
}

p {
  font-size: 16px;
  line-height: 1.5;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f4f4f4;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}

button {
  margin-top: 20px;
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
