export default function Feed({posts}){




    if(posts)
    {
        return (
            <>
                {posts.map(post => {
                    return <article key={post.id} className="small_card">
                       <article>
                        <p>{post.description}</p>
                       </article>
                    </article>
                })}
            </>
        )
    }

    return(
        <p>
            Still empty, you can always change that :D
        </p>
    )
   
}