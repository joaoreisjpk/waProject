import Link from "next/link";

export default function Start() {
  return (
    <>
      <button>
        <Link href="/questions">
          <a>Start</a>
        </Link>
      </button>
      <button>
        <Link href="/">
          <a>Cancel</a>
        </Link>
      </button>
    </>
  )
}
