import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <div className={styles.logoIcon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="8" fill="currentColor" />
          <path
            d="M11 8H21C21.5523 8 22 8.44772 22 9V11C22 11.5523 21.5523 12 21 12H11C10.4477 12 10 11.5523 10 11V9C10 8.44772 10.4477 8 11 8Z"
            fill="white"
          />
          <path
            d="M11 14H21C21.5523 14 22 14.4477 22 15V17C22 17.5523 21.5523 18 21 18H11C10.4477 18 10 17.5523 10 17V15C10 14.4477 10.4477 14 11 14Z"
            fill="white"
          />
          <path
            d="M11 20H17C17.5523 20 18 20.4477 18 21V23C18 23.5523 17.5523 24 17 24H11C10.4477 24 10 23.5523 10 23V21C10 20.4477 10.4477 20 11 20Z"
            fill="white"
          />
        </svg>
      </div>
      <h1>Elegant Blog</h1>
    </Link>
  );
}
