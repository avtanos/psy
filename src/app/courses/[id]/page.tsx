import { MOCK_COURSES } from "@/lib/mock-data";
import { CourseDetailClient } from "./client";

export function generateStaticParams() {
  return MOCK_COURSES.map((c) => ({ id: c.id }));
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const c = MOCK_COURSES.find((x) => x.id === params.id) ?? MOCK_COURSES[0];
  return <CourseDetailClient course={c} />;
}
