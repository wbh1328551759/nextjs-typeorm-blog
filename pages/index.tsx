import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <div className='cover'>
        <img className='logo' src='/logo.png' alt=""/>
        <h1>Wbh 的个人博客</h1>
        <p className='description'>一个 div 工程师，面向 div 编程</p>
        <p><Link href='/posts'><a>文章列表</a></Link></p>
      </div>

      <style jsx>{`
        .logo{
          height: 250px;
        }
        .cover {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .description {
          color: #333;
          margin: 0;
        }
        a {
          color: #00adb5;
          text-decoration: underline #00adb5;
        }
      `}</style>
    </>
  )
}


export default Home

