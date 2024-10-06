import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProjectLoading() {
  return (
    <div className="container mx-auto my-10 p-6 border rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton width={200} height={36} /> {/* 프로젝트 이름 */}
        <Skeleton circle width={24} height={24} /> {/* 편집 아이콘 */}
        <Skeleton circle width={28} height={28} /> {/* 삭제 아이콘 */}
      </div>
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton height={200} /> {/* FRONTEND 배포 상태 */}
              <Skeleton height={200} /> {/* BACKEND 배포 상태 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
