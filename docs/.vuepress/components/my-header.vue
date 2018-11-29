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
    children: i.children.map(child => ({
      ...child,
      link: `/${i.name}/${child.meta.attributes.title}.html`,
      ...( child.meta ? {
        meta: {
          ...child.meta,
          attributes: {
            ...child.meta.attributes,
            videoThumbnail: child.meta.attributes.videoURL ?
              getThumbnail(child.meta.attributes.videoURL) :
              'data:image/png;base64,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'
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
