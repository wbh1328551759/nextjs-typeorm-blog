import Link from 'next/link';
import React from 'react';
import _ from 'lodash';

type usePagerOptions = {
  page: number;
  totalPage: number;
  urlMaker?: (n: number) => string;
}

const defaultUrlMaker = (n: number) => `?page=${n}`

export const usePager = ({page, totalPage, urlMaker = defaultUrlMaker}: usePagerOptions) => {
  const numbers = [];
  numbers.push(1);
  numbers.push(totalPage);
  for (let i = page - 2; i <= page + 2; i++) {
    numbers.push(i);
  }
  const deDuplicationArray = _.uniq(numbers).sort().filter(n => n >= 1 && n <= totalPage);
  const pageNumbers = deDuplicationArray.reduce((result, n) =>
      n - (result[result.length - 1] || 0) === 1 ?
        result.concat(n) : result.concat(-1, n)
    , []);

  const pager = (
    <div className='wrapper'>
      {page !== 1 && <Link href={urlMaker(page - 1)}>
        <a className='link'>上一页</a>
      </Link>}
      {pageNumbers.map(n =>
        n === -1 ?
          <span>...</span> :
          n === page? <span>{n}</span>:<Link href={urlMaker(page)}><a className='link'>{n}</a></Link>
      )}
      {page < totalPage && <Link href={urlMaker(page + 1)}>
        <a className='link'>下一页</a>
      </Link>}
      <span>第 {page} / {totalPage} 页</span>


      <style jsx>{`
        .wrapper {
          margin: 0 -8px;
        }
        .wrapper a, .wrapper span{
          margin: 0 8px;
        }
        .wrapper .link{
          color: #4285f4;
        }
        .wrapper span{
          color: rgba(0,0,0,.87);
        }
      `}</style>
    </div>
  );

  return {pager};
};
