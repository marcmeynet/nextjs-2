import Head from "next/head";

const HtmlHead = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="this is a very nice meetup website" />
    </Head>
  );
};

export default HtmlHead;