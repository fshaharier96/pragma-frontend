import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FormLoadingSkeleton = () => {
    return (
        <SkeletonTheme
            baseColor="#e2e8f0"
            highlightColor="#f8fafc"
        >
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr] border-t border-slate-200">
                {/* Form Skeleton */}
                <div className="space-y-6 bg-white rounded-lg px-5 py-6 sm:px-7">
                    <div className="grid gap-5 md:grid-cols-2">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="space-y-2">
                                <Skeleton width={100} height={16} />
                                <Skeleton height={46} borderRadius={8} />
                            </div>
                        ))}
                    </div>

                    {/* Textarea */}
                    <div className="space-y-2">
                        <Skeleton width={120} height={16} />
                        <Skeleton height={120} borderRadius={8} />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
                        <Skeleton width={110} height={45} borderRadius={8} />
                        <Skeleton width={150} height={45} borderRadius={8} />
                    </div>
                </div>

                {/* Aside Skeleton */}
                <div className="space-y-4">
                    <div className="rounded-lg bg-white p-5">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                            <Skeleton
                                width={40}
                                height={40}
                                borderRadius={8}
                            />

                            <div className="flex-1 space-y-2">
                                <Skeleton width={120} height={16} />
                                <Skeleton width={90} height={12} />
                            </div>
                        </div>

                        {/* Preview Fields */}
                        <div className="mt-5 border-t border-slate-200 pt-4 space-y-4">
                            {[...Array(2)].map((_, index) => (
                                <div key={index}>
                                    <Skeleton width={70} height={12} />
                                    <Skeleton
                                        className="mt-2"
                                        width="90%"
                                        height={18}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Help Text Skeleton */}
                    <div className="rounded-lg bg-white p-5 ">
                        <Skeleton count={1} />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default FormLoadingSkeleton;
