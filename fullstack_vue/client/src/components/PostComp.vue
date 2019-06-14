<template>
  <div class="container">

    <div class="left-column">
      <a class="menu-item" href='#'>Home</a>
      <a class="menu-item" href='#'>About</a>
      <a class="menu-item" href='#'>Products</a>
      <a class="menu-item" href='#'>Subscriptions</a>
      <a class="menu-item" href='#'>Contact</a>
      <a class="menu-item" href='#'>Donate</a>
    </div>

    <div class="main-column">
      <h1>Latest Posts</h1>
        <div class="create-post">
          <label>Say something</label> 
          <input type="text" id="create-post" v-model="text" placeholder="Create a post">
          <button v-on:click="createPost">Post</button>
        </div>
      <hr>
      <div class="error" v-if="error">{{ error }}</div>
      <div class="post-container">
        <div class="post"
          v-for = "(post, index) in posts"
          v-bind:item = "post"
          v-bind:index = "index"
          v-bind:key = "post._id"
          v-on:dblclick="deletePost(post._id)">

          <p>{{ post.created.getDate() }}/{{ post.created.getMonth() }}//{{ post.created.getFullYear() }}</p>
          <p class="text">{{ post.text }}</p>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import PostService from '../PostService';
export default {
  name: 'PostComp',
  data(){
    return {
      posts: [],
      error: '',
      text: '',
    }
  },
  async created(){
    try {
      this.posts = await PostService.getPosts();
    } catch (err){
      this.error = err.message;
    }
  },
  methods: {
    async createPost(){
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    }, 
     async deletePost(id){
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 950px;
  width: 100%;
  border: 1px solid #777;
  margin: 10px auto;
  display: flex;
  flex-flow: row wrap;
}

.left-column {
  display: flex;
  flex-flow: column wrap;
  background: #42b983;
  flex: 1;
}

.main-column {
  display: flex;
  flex-flow: column wrap;
  flex: 3;
}

.menu-item {
  display: block;
  flex: 1;
  padding: 10px;
  color: #42b983;
  background: #fff;
  border: 1px solid #42b983;
  text-decoration: none;
}

.post {
  background: #86fdb7;
  margin: 5px;
  padding: 10px;
  color: #000;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
