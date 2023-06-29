export async function getCommentCount(commentIds, indent = "") {
  if (!commentIds) return 0;

  const len = await commentIds.reduce(async (prevP, curr) => {
    const prev = await prevP;
    const resp = await fetch("/api/comments/" + curr);
    const data = await resp.json();

    let childrenLen = 0;
    if (data.commentIds) {
      childrenLen = await getCommentCount(data?.commentIds, indent + "  ");
    }

    return prev + childrenLen;
  }, Promise.resolve(commentIds?.length));

  return len;
}
