import { redirect } from "next/navigation";

/**
 * Default entry: jump straight to the KE023 flight card.
 * Replace this with a multi-flight landing later if we ever need one.
 */
export default function HomePage() {
  redirect("/flight/KE023");
}
