import React from 'react'
import { useEffect, useState } from 'react';
import { Image } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./assets/OpenNews.scss";
import { Link, Navigate, useParams } from 'react-router-dom';
import http from '../../ui/Services';
import { MdVisibility } from 'react-icons/md';
import { MdOutlineDateRange } from 'react-icons/md';
import { FcShare } from 'react-icons/fc';
import { FaTelegramPlane, FaFacebookF } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { api, region, url, urlV } from '../../../host';
import { useCookies } from 'react-cookie';



function OpenNews() {
    const { t } = useTranslation();
    const [data, setData] = useState<any>({})
    const [error, setError] = useState<any>(false)
    const [newsUz, setnewsUz] = useState<any>([])
    const [newsRu, setnewsRu] = useState<any>([])
    const [cookies, setCookie] = useCookies<any>([]);
    const params = useParams();
    const { id } = params;
    const [idT, setidT] = useState<any>(id)
    
    const editUrl=()=>{
        window.localStorage.href=api+"/allnews"
    }
  
    //    @ts-ignore
    const getOpenNews=(id)=>{
        setCookie(id, id, {
            maxAge: 21600 
         });
      
        http.get<any>(`/GetApi/GetNewsById/${id}`)
        .then((res)=>{
            var config=res.data
          var textUz=config.mainTextUz  
          var textRu=config.mainTextRu
          var date=config.newsDate.substring(0, 10)
          var d=date.substring(8, 10)+'.'+date.substring(5, 7)+'.'+date.substring(0, 4)
          config.newsDate=d
          var Uz=""  
          var Ru=""  
          if(textUz!==null){
              textUz.split("</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>").map((item:any)=>{
                  Uz+=item+"<br/><br/>"

                              })
                              textUz=""
                              Uz.split("</p>\r\n\r\n<p>").map((item:any)=>{
              
                                  textUz+=item+"<br/>"
                                              })
                                              config.mainTextUz=textUz
          }
          if(textRu!==null){

              textRu.split("</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>").map((item:any)=>{
                  Ru+=item+"<br/><br/>"
                              })
                              
                              textRu=""

              Ru.split("</p>\r\n\r\n<p>").map((item:any)=>{
                  textRu+=item+"<br/>"
                              })

                                                              
                                                              config.mainTextRu=textRu
          }
         
          setData(config); console.log(config)})
         .catch(e =>setError(true))
         http.get<any>(`/GetApi/GetNews/?regionId=${region}`)
         .then((res) => {
         
            var b:any=[]
            res.data.map((item:any)=>{
                var x=item
                x.newsDate=x.newsDate.substring(8, 10)+'.'+x.newsDate.substring(5, 7)+'.'+x.newsDate.substring(0, 4)
                b.push(x)
                
                            })   
            var f:any=[]
            for(let i=0; i<b.length; i++){
                if(b[i].titleUz!==null){
f.push(b[i])
                }
            }
          
            setnewsUz(f.slice(0,6))
            var b=res.data
            var a:any=[]
            var f:any=[]
            for(let i=0; i<b.length; i++){
                if(b[i].titleRu!==null){
f.push(b[i])
                }
            }
            
            setnewsRu(f.slice(0,6))
      }).catch(e => console.log(e))
  }
    useEffect(() => {
       var id=window.location.href
       if(!id.split('/')[id.split('/').length-1].match(/[\w??-??]+/ig)){
           window.location.href=
       }
        getOpenNews(idT)
    }, []);
    return (

        <div className="open-news" style={{padding:'50px 18%'}}>
            {
            error?<Navigate to="/error" />:
            t('check') && data.titleUz===null || !t('check') && data.titleRu===null?<Navigate to="/allnews"/>:<div className="container" >
                <Row >
<Col lg={17} md={24} sm={24}>

<div className="open-news-title">
                    {Object.keys(data).length !== 0 &&
                      <h5>{t('lang') === 'uz' ? data.titleUz : data.titleRu}</h5>
      
                    }
                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    
                <div className="open-news-visites">
                <a target="_blank" >
                        <p><FcShare className='icon' size='1.4rem' /></p>
                        {Object.keys(data).length !== 0 &&
                            <p className="yoz"></p>
                        }
                    </a>
                <a target="_blank" href={`https://www.facebook.com/sharer.php?u=https://test.vitc.uz/GetApi/GetNewsById/6`} className="date">
                        <p><FaFacebookF className='icon' size='1.4rem' /></p>
                        {Object.keys(data).length !== 0 &&
                            <p className="yoz"></p>
                        }
                    </a>
                <a target="_blank" href={`https://telegram.me/share/url?url=https://test.vitc.uz/allnews/${data.id}/&text=${t('lang') === 'uz' ? data.titleUz : data.titleRu}`} className="date">
                        <p><FaTelegramPlane className='icon' size='1.4rem' /></p>
                        {Object.keys(data).length !== 0 &&
                            <p  className="yoz"></p>
                        }
                    </a>
                    </div>
                    <div className="open-news-visites">
                    <div className="date">
                        <p><MdOutlineDateRange className='icon' size='1.4rem' /></p>
                        {Object.keys(data).length !== 0 &&
                            <p>{data.newsDate.substring(0, 10)}</p>
                        }
                    </div>
                    <div className="visites">
                        <p><MdVisibility className='icon' size='1.4rem' /></p>
                        {Object.keys(data).length !== 0 &&
                            <p>{data.visits}</p>
                        }
                    </div>


                </div>
                
                </div>
                <Image.PreviewGroup>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}
              className="mySwiper"
            >
              <SwiperSlide>
              <div
                        className="swiper-slide_body"
                       style={{
                     
                          display:'flex',
                          alignItems:'center',
                          justifyContent:'center',
                    
                          
                       }}
                      >
                        <Image className='red' style={{height:'auto', width:"100%" }} src={`${data.regionId===null?urlV:url}/${data.titleImage}`}/>  
                      </div>
                      </SwiperSlide>
                  
                  {data.newsImage && data.newsImage.length!==0?data.newsImage.map((item: any, index: any)=>{
                      return(<SwiperSlide><div
                        className="swiper-slide_body"
                        style={{
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            
                    
                        
                           


                        }}
                      >
                             <Image className='red' style={{height:'auto', width:"100%"}} src={`${data.regionId===null?urlV:url}/${item.imageUrl}`}/>  
                      </div>
                       </SwiperSlide>)

                  }):''}
                
             
             
              
              
            </Swiper>

                <div className="open-news-text">
                    {Object.keys(data).length !== 0 &&
                        <p>
                            <p className='salomText' style={{textAlign:'justify', lineHeight:"2", fontSize:'18px', textIndent:'50px'}} dangerouslySetInnerHTML={{__html: t('lang') === 'uz' ? data.mainTextUz : data.mainTextRu}}>

                            </p>
                        </p>
                    }
                </div>
            </Image.PreviewGroup>
    </Col>
    <Col lg={7} md={0} sm={0} className="newTabCol">
   <ul className="newTab">
       <h4>{t("So'ngi yangiliklar")}</h4>
       
       {t("check")?newsUz.length!==0?newsUz.map((item:any, key:any)=>{
           return( <li onClick={()=>{getOpenNews(item.id)}}>
           <Link to={"/allnews/" + item.id} className="news_list-item1" key={key}>
            <div className='icons'>
            <p className='tabDate'><MdOutlineDateRange className='icon' size='1rem' />{
                                        item.newsDate.substring(0, 10)
                                    }</p>
            <p className='tabDate'>{
                                        item.visits
                                    }<MdVisibility className='icon' size='1rem' /></p>
            </div>   
            <div className='titles'>             
            <p className='tabTitle' style={{textTransform:'uppercase'}}>{t('lang') === 'uz' ? item.titleUz : item.titleRu}</p>
            </div></Link>
            </li>)
       }):'':newsRu.length!==0?newsRu.map((item:any, key:any)=>{
        return( <li onClick={()=>{getOpenNews(item.id)}}>
        <Link to={"/allnews/" + item.id} className="news_list-item1" key={key}>
         <div className='icons'>
         <p className='tabDate'><MdOutlineDateRange className='icon' size='1rem' />{
                                     item.newsDate.substring(0, 10)
                                 }</p>
         <p className='tabDate'>{
                                     item.visits
                                 }<MdVisibility className='icon' size='1rem' /></p>
         </div>   
         <div className='titles'>             
         <p className='tabTitle' style={{textTransform:'uppercase'}}>{t('lang') === 'uz' ? item.titleUz : item.titleRu}</p>
         </div></Link>
         </li>)
    }):''}
  
   </ul>
        </Col>

                </Row>
      
<br/>
<br/>

            </div>}
          
        </div>
    )
}

export default OpenNews;