import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

const AboutId = (props: Record<string, string>) => {
  const router = useRouter();

  console.log(props);

  // If the page is still loading, you can show a loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>{props.id}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { id: "1" } }, // about/1
    { params: { id: "2" } }, // about/2
  ];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;

  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  return { props: { repo, id } };
};

export default AboutId;
