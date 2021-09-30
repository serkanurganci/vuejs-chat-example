<template>
  <div class="view login" v-if="state.username === '' || state.username === null">
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login to Chat</h1>
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          v-model="inputUsername"
          placeholder="Please enter your username..." />
        <input
          type="submit"
          value="Login" />
      </div>
    </form>
  </div>

  <div class="view chat" v-else>
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>

    <section class="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="(message.username == state.username ? 'message current-user' : 'message')">
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="SendMessage">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Write a message..." />
        <input
          type="submit"
          value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue';
import db from './db';
export default {
  setup () {
    const inputUsername = ref("");
    const inputMessage = ref("");
    const state = reactive({
      username: "",
      messages: []
    });
    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    }
    const Logout = () => {
      state.username = "";
    }
    const SendMessage = () => {
      const messagesRef = db.database().ref("messages");
      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      const message = {
        username: state.username,
        content: inputMessage.value
      }
      messagesRef.push(message);
      inputMessage.value = "";
    }
    onMounted(() => {
      const messagesRef = db.database().ref("messages");
      messagesRef.on('value', snapshot => {
        const data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          });
        });
        state.messages = messages;
      });
    });
    return {
      inputUsername,
      Login,
      state,
      inputMessage,
      SendMessage,
      Logout
    }
  }
}
</script>

<style lang="scss">
.view {
  @apply flex justify-center min-h-screen bg-purple-300;

  &.login {
    @apply items-center;
    .login-form {
      @apply w-10/12 sm:w-6/12;
      .form-inner {
        @apply py-14 px-4 bg-white rounded shadow-2xl;
        h1 {
          @apply text-black font-bold text-lg mb-7;
        }
        label {
          @apply mb-1 text-black text-base duration-300;
        }
        input[type="text"] {
          @apply appearance-none border-0 outline-none bg-none w-full py-3 px-4 rounded-xl mb-4;
          &::placeholder {
            @apply text-gray-500 duration-500;
          }
        }
        input[type="submit"] {
          @apply appearance-none border-0 outline-none bg-none w-full bg-pink-600 rounded-lg text-white text-lg font-bold py-4 cursor-pointer;
        }
        &:focus-within {
          label {
            @apply text-purple-500;
          }
          input[type="text"] {
            @apply bg-white shadow-lg;
            &::placeholder {
              @apply text-gray-200;
            }
          }
        }
      }
    }
  }
  &.chat {
    @apply flex-col;
    header {
      @apply relative block w-full pt-12 pb-8 px-2.5;
      .logout {
        @apply absolute top-4 right-4 text-white text-base mb-3 text-right;
      }
      h1 {
        @apply text-white;
      }
    }
    .chat-box {
      @apply rounded-t-xl rounded-r-xl bg-white shadow-lg p-8 flex-auto;
      .message {
        @apply flex mb-4;
        .message-inner {
          .username {
            @apply text-gray-400;
          }
          .content {
            @apply inline-block py-2.5 px-5 bg-gray-100 rounded-lg text-black text-lg;
          }
        }
        &.current-user {
          @apply mt-8 justify-end items-end;
          .message-inner {
            .content {
              @apply text-white font-semibold bg-purple-600;
            }
          }
        }
      }
    }
    footer {
      @apply sticky bottom-0 bg-white p-8 shadow-inner;
      form {
        @apply flex;
        input[type="text"] {
          @apply flex-auto border-0 outline-none bg-none block w-full py-2 px-4 rounded text-black text-lg bg-gray-100 duration-300;
          &::placeholder {
            @apply text-gray-400 duration-300;
          }
        }
        input[type="submit"] {
          @apply border-none outline-none bg-none block p-2 px-4 rounded bg-purple-600 text-white text-lg font-bold;
        }
      }
    }
  }
}
</style>
