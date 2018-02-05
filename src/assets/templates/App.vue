<template>
    <section class="hero is-light is-fullheight">
        <div class=hero-head>
            <div class="container">
                <h1 class="title">
                    Random Choice
                </h1>
                <h2 class="subtitle">
                    Settle simple decision making
                </h2>
                <p class="has-text-centered has-text-info">Add at least two choices &mdash; remove individual choice by pressing on choice</p>
                <hr>
                <div class=has-text-centered>
                    <input v-model.trim="item" class="input" ref="choiceTextBox" style="width:50% !important; min-width:250px;" type="text" placeholder="Insert choice">
                    <button @click="add" class="button" :disabled="loading || item.length < 1">Add</button>
                    <button @click="selectRandom" class="button is-dark" :class="{'is-loading': loading}" :disabled="items.length < 2">Pick!</button>
                </div>

            </div>
        </div>
        <div class="hero-body has-text-centered">
            <div class="container">
                <ul style="padding-bottom:1em;">
                    <li v-for="(item,index) in items">
                        <a class="has-text-centered" :class="{'has-text-weight-bold':item.selected}" @click="remove(index)"> {{item.text}} </a>
                    </li>
                </ul>
                <button @click="remove('all')" :style="{display: items.length < 2 ? 'none' : 'inline-flex'}" class="button">Remove All </button>
            </div>
        </div>
        <div class="hero-footer has-text-centered">

        </div>
    </section>
</template>
<script>
export default {
  name: "random-choices",
  data() {
    return {
      items: [],
      item: "",
      loading: false
    };
  },
  methods: {
    add() {
      this.items.push({ text: this.item, selected: false });
      this.item = "";
      this.$refs.choiceTextBox.focus();
    },
    selectRandom() {
      if (this.items.length > 0) {
        this.loading = true;
        setTimeout(() => {
          this.items.forEach(c => (c.selected = false));
          this.items[
            Math.floor(Math.random() * this.items.length)
          ].selected = true;
          this.loading = false;
        }, 2000);
      } else {
      }
    },
    remove(i) {
      if (typeof i === "string" && i === "all") this.items = [];
      else if (typeof i === "number") this.items.splice(i, 1);
    }
  }
};
</script>

