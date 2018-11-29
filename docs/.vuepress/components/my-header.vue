<template>
  <div class="container"> 
      <div>
        <section v-for="item in data" class="section">
          <a v-bind:href="item.docLink" class="section-title">{{item.name}}</a>
          <div class="topic-container">
            <a v-bind:href="topic.link" v-for="topic in item.children" class="section-topics">
              <img v-bind:src="topic.meta.attributes.videoThumbnail" class="section-topic__image"/>
              <div class="section-topic__title">{{topic.meta.attributes.title}}</div>
              <div class="section-topic__desc">{{topic.meta.attributes.desc}}</div>
            </a>
          </div>
        </section>
      </div>
  </div>
</template>
<script>
  
  const { sideBarData } = require('./../../sideBar');
  const mdData = require('./../mdFiles.json');

  const getThumbnail = url => {
    const urlArr = url.split("=");
    return `https://img.youtube.com/vi/${urlArr[urlArr.length - 1]}/mqdefault.jpg`
  }
  
  const formattedData = mdData.map(i => ({
    ...i,
    docLink: `/${i.name}/`,
    children: i.children.filter(child => child.name !== 'Readme.md').map(child => ({
      ...child,
      link: `/${i.name}/${child.meta.attributes.title.replace(' ', '-')}.html`,
      ...( child.meta ? {
        meta: {
          ...child.meta,
          attributes: {
            ...child.meta.attributes,
            videoThumbnail: child.meta.attributes.videoURL ?
              getThumbnail(child.meta.attributes.videoURL) :
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII='
          }
        }
      } : {})
    }))
  }))

  export default {
        data () {
            return {
                data: formattedData,
                number: 0
            }
        },
    }
</script>
<style scoped>
  .container {
    margin-top: 35px;
  }

  .topic-container {
    display: flex;
    flex-wrap: wrap;
  }

  .section-title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 23px;
    display: inline-block;
    color: black;
  }

  .section-topics {
    width: 31%;
    margin-right: 2%;
    margin-bottom: 50px;
    color: initial;
    font-weight: normal;
  }

  img.section-topic__image {
      width: 100%;
      height: 167px;      
      margin-bottom: 15px;
  }

  .section-topic__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
}

</style>
