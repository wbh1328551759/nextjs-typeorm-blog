import React from 'react';
import Link from 'next/link';
import styles from 'styles/first-post.module.css'

export default function FirstPost() {

  return (
    <>
      <div className={styles.wrapper}>
        First Post
        <hr/>
        <div className={styles.content}>回到首页</div>
        <Link href="/"><a>点击这里</a></Link>
      </div>
    </>
  );
}
