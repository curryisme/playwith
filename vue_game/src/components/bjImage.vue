<template>
    <div id="bg"> 
        <slot class="animated fadeIn"></slot>
    </div>
</template>

<script>

export default {
    props: ['src'],
    name: "bjImage",
    data() {
        return {
           
        };
    },
    computed: {
      
    },
    created() {},
    mounted() {
       
    },
    methods: {
    
    },
    watch: {
      
    },
};
</script>
<style lang='scss' scoped>
#bg { 
    position: fixed; 
    top: -50%; 
    left: -50%; 
    width: 200%; 
    height: 200%;
    z-index: 0;
}
#bg img { 
    position: absolute;
    top: 0; left: 0;
    right: 0;
    bottom: 0; 
    margin: auto; 
    min-width: 50%;
    min-height: 50%;
}
</style>