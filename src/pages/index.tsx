import { GetServerSideProps } from 'next'

export default function Home() {
  return <></>
}

export const getServersideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/home',
      permanent: true,
    },
  }
}
