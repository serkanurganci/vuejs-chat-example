<template>
<div class="view login">
  <form class="login-form" @submit.prevent="Login" v-if="state.username === '' || state.username === null">
    <h1>Login to Firechat</h1>
   <div class="form-inner">
     <label for="usernme">Username</label>
     <input type="text" v-model="inputUserName" placeholder="Please enter your username..."/>
     <input type="submit" value="Login">
   </div>
  </form>
</div>
  <div class="view chat" v-else>
    <h1>Chat View</h1>
  </div>
</template>

<script>
import {reactive, onMounted, ref} from 'vue';

export default {
  setup() {
    const inputUserName = ref("")

    const state = reactive({
      username:'',
      message:[]
    })

    const Login = () => {
      if(inputUserName.value != "" || inputUserName.value != null){
        state.username = inputUserName.value
        inputUserName.value = ''
      }
      console.log(state)
    }

   return {
     inputUserName,
     Login,
     state
  }
 },
}
</script>

<style lang="scss">
.view {
  @apply flex justify-center min-h-screen bg-blue-200;

  &.login {
    @apply items-center;
    .login-form {
      @apply w-6/12;
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
          @apply appearance-none border-0 outline-none bg-none w-full bg-red-500 rounded-lg text-white text-lg font-bold py-4 cursor-pointer;
        }
        &:focus-within {
          label {
            @apply text-red-500;
          }
          input[type="text"] {
            background-color: #FFF;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
            &::placeholder {
              color: #666;
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
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #FFF;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: #FFF;
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #FFF;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #F3F3F3;
            border-radius: 999px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }
        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;
          .message-inner {
            max-width: 75%;
            .content {
              color: #FFF;
              font-weight: 600;
              background-color: #ea526f;
            }
          }
        }
      }
    }
    footer {
      position: sticky;
      bottom: 0px;
      background-color: #FFF;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #F3F3F3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background-color: #ea526f;
          color: #FFF;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
