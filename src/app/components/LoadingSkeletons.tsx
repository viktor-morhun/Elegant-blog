import styles from "./LoadingSkeletons.module.css";

export function PostListSkeleton() {
  return (
    <div className={styles.postGrid}>
      {[...Array(6)].map((_, index) => (
        <div key={index} className={styles.postCardSkeleton}>
          <div className={`${styles.titleSkeleton} skeleton`}></div>
          <div className={`${styles.metaSkeleton} skeleton`}></div>
          <div className={`${styles.contentSkeleton} skeleton`}></div>
          <div className={`${styles.contentSkeleton} skeleton`}></div>
          <div className={styles.footerSkeleton}>
            <div className={`${styles.linkSkeleton} skeleton`}></div>
            <div className={`${styles.commentsSkeleton} skeleton`}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className={styles.postDetailSkeleton}>
      <div className={styles.postHeaderSkeleton}>
        <div className={`${styles.backLinkSkeleton} skeleton`}></div>
        <div className={`${styles.editLinkSkeleton} skeleton`}></div>
      </div>
      <div className={styles.postContentSkeleton}>
        <div className={`${styles.titleLargeSkeleton} skeleton`}></div>
        <div className={`${styles.metaSkeleton} skeleton`}></div>
        <div className={styles.bodySkeleton}>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`${styles.paragraphSkeleton} skeleton`}
            ></div>
          ))}
        </div>
      </div>
      <div className={styles.commentsSectionSkeleton}>
        <div className={`${styles.commentsHeaderSkeleton} skeleton`}></div>
        {[...Array(3)].map((_, index) => (
          <div key={index} className={styles.commentSkeleton}>
            <div className={styles.commentHeaderSkeleton}>
              <div className={`${styles.authorSkeleton} skeleton`}></div>
              <div className={`${styles.dateSkeleton} skeleton`}></div>
            </div>
            <div className={`${styles.commentTextSkeleton} skeleton`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
