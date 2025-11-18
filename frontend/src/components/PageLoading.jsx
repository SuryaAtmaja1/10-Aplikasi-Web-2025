export default function PageLoading({ message = "Sedang memuat laman" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay*/}
      <div className="absolute inset-0 bg-hitam/25 backdrop-blur-[2px]"></div>

      {/* Loader content */}
      <div className="relative rounded-xl px-10 py-16 bg-putih shadow-xl flex flex-col items-center gap-[40px]">
        <div className="animate-spin">
          <svg
            width="82"
            height="85"
            viewBox="0 0 82 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M79.4285 52.6398C81.3076 53.1641 82.4201 55.1194 81.7398 56.9478C79.2683 63.5906 75.1479 69.5193 69.7423 74.1624C63.4409 79.5749 55.676 82.9973 47.4295 83.9968C39.1831 84.9963 30.8254 83.528 23.4134 79.7775C16.0015 76.0271 9.8681 70.1629 5.78891 62.9267C1.70973 55.6904 -0.132056 47.4071 0.496473 39.124C1.125 30.841 4.19561 22.9304 9.32 16.3926C14.4444 9.85469 21.3924 4.98319 29.2854 2.39411C36.0564 0.173091 43.2619 -0.282752 50.2247 1.04178C52.1412 1.40636 53.2382 3.37037 52.7139 5.24951V5.24951C52.1896 7.12865 50.2423 8.20805 48.3198 7.87613C42.7104 6.90761 36.9301 7.32172 31.4874 9.10705C24.9221 11.2606 19.1428 15.3127 14.8804 20.7508C10.618 26.1889 8.06389 32.7689 7.54109 39.6586C7.01828 46.5483 8.55026 53.4383 11.9433 59.4574C15.3363 65.4764 20.438 70.3541 26.6032 73.4737C32.7684 76.5933 39.7202 77.8146 46.5795 76.9833C53.4388 76.1519 59.8976 73.3052 65.139 68.8031C69.4842 65.0709 72.831 60.3399 74.9064 55.0393C75.6177 53.2227 77.5494 52.1155 79.4285 52.6398V52.6398Z"
              fill="#D1345B"
            />
          </svg>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-h8 mb-1 font-instrument font-semibold">
            Tolong tunggu...
          </p>
          <p className="text-body-xl font-normal text-[#666666]">{message}</p>
        </div>
      </div>
    </div>
  );
}
