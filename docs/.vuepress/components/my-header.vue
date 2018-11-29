<template>
  <div class="container"> 
      <div>
        <section v-for="item in data" class="section">
          <a v-bind:href="item.docLink" class="section-title">{{item.name}}</a>
          <div class="topic-container">
            <a v-bind:href="topic.link" v-for="topic in item.children" class="section-topics">
              <img v-if="topic.meta.attributes.videoThumbnail" v-bind:src="topic.meta.attributes.videoThumbnail" class="section-topic__image"/>
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
  
  const formattedData = mdData.map(i => {
    const indexFile = i.children.find( child => child.name === 'Readme.md');
    return {
    ...i,
    name: indexFile.meta.attributes.title,
    docLink: `/${i.name}/`,
    children: i.children.filter(child => child.name !== 'Readme.md').map(child => ({
      ...child,
      link: `/${i.name}/${child.meta.attributes.title.replace(' ', '-').toLowerCase()}.html`,
      ...( child.meta ? {
        meta: {
          ...child.meta,
          attributes: {
            ...child.meta.attributes,
            ...(child.meta.attributes.videoURL ? { videoThumbnail : getThumbnail(child.meta.attributes.videoURL) } : {})              
          }
        }
      } : {})
    }))
  }})

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
    margin-top: 14px;

  }

  .section-topic__desc {
    line-height: 20px;
    font-size: 14px;
}

  .section-title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 23px;
    display: inline-block;
    color: #2c3e50;
  }

  .section-topics {
    color: #2c3e50;
    font-weight: normal;
    position: relative;
  }

  a.section-topics:before {
    opacity: 0;
    transition: 0.15s ease-in opacity;
    position: absolute;
    top: -12px;
    left: -14px;
    right: -13px;
    bottom: -12px;
    content: '';
    z-index: -1;
    border-radius: 3px;
    box-shadow: 0 0 5px #0000002e;
  }

  .section-topics:hover:before{
    opacity: 1;
  }

  img.section-topic__image {
    width: 100%;
    height: 138px;
    margin-bottom: 9px;
  }

  .section-topic__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 14px;
}
@media all and (min-width: 720px) {
  .section-topics {
    width: 25.4%;
    margin-right: 5%;
    margin-bottom: 50px;
  } 
}

@media all and (max-width: 720px) {
  .section-topics {
    margin-bottom: 30px;
  }

  img.section-topic__image{
    width:  auto;
  }
}

</style>
