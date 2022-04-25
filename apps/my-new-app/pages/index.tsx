/* eslint-disable @typescript-eslint/no-namespace */
import Head from 'next/head';
import { useAmp } from 'next/amp';
import Layout from '../components/Layout';
import Byline from '../components/Byline';

export const config = {
  amp: true,
};

declare global {
   namespace JSX {
     interface IntrinsicElements {
       [elemName: string]: any;
     }
   }
 }

export default function IndexPage() {
  const isAmp = useAmp();

  return (
    <>
      <Layout>
        <Head>
          <title>The Cat</title>
        </Head>
        <h1>The Cat (AMP-first Page)</h1>
        <Byline author="Dan Zajdband" />
        <p className="caption">Caption</p>
        <amp-img
          alt="Mountains"
          width="550"
          height="368"
          layout="responsive"
          src="https://amp.dev/static/inline-examples/images/mountains.webp"
        >
          <amp-img
            alt="Mountains"
            fallback=""
            width="550"
            height="368"
            layout="responsive"
            src="https://amp.dev/static/inline-examples/images/mountains.jpg"
          ></amp-img>
        </amp-img>
        <p>Some content goes here.</p>
        <style jsx>{`
          h1 {
            margin-bottom: 5px;
          }
          p {
            font-size: 18px;
            line-height: 30px;
            margin-top: 30px;
          }
          .caption {
            color: #333;
            margin-top: 0;
            font-size: 14px;
            text-align: center;
          }
        `}</style>
      </Layout>
    </>
  );
}
