import FollowButton from '@/components/FollowButton'

const testbg = () => {
  return (
    <>
      <FollowButton isFollowing={false} />
      <h1>++</h1>
      <FollowButton isFollowing={true} />
      <h1>h1</h1>
      <h1>h1</h1>
      <h1>h1</h1>
    </>
  )
}

export default testbg
