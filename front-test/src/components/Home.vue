<template>
  <div>
    <h2>게시글 목록</h2>
    <button @click="goToCreatePage">게시글 작성하기</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>작성자</th>
          <th>댓글 수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in boards" :key="board.idx">
          <td>
            <router-link :to="`/board/${board.idx}`">
              {{ board.idx }}
            </router-link>
          </td>
          <td>{{ board.title }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ board.commentCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const boards = ref([]);

const fetchBoards = async () => {
  try {
    const response = await axios.get("/api/board/list");
    console.log(response);
    boards.value = response.data;
  } catch (error) {
    console.error("게시글 목록을 불러오는 중 오류 발생:", error);
  }
};

const goToCreatePage = () => {
  router.push("/create");
};

onMounted(fetchBoards);
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f8f9fa;
}
</style>
