import {
  buttonClickedStyle,
  buttonStyle,
  getErrorMessage,
  idNumberRegex,
  idNumberSuffixRegex,
  inputErrorStyle,
  inputStyle,
  nameRegex,
  phoneNumberRegex,
  verificationCodeRegex,
} from "@/app/signup/_component/IdentityVerification";
import {
  sendVerificationRequest,
  setVerificationExpired,
  verifyCodeRequest,
} from "@/stores/slice/verificationSlice";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SmallBorderButton from "../buttons/SmallBorderButton";
import ColorButton from "../buttons/ColorButton";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useSession } from "next-auth/react";

interface modalProps {
  onClose: () => void;
  phone: string;
}

const VerificationModal = ({ onClose, phone }: modalProps) => {
  const dispatch = useDispatch();
  const { isVerified, isExpired } = useSelector(
    (state: RootState) => state.verification
  );
  const [gender, setGender] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [carrierError, setCarrierError] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(179);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const { data: session } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    setError,
    clearErrors,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const phoneNumberValue = watch("phoneNumber");
  const carrierValue = watch("carrier");

  // 유효성검증
  useEffect(() => {
    if (phoneNumberValue) {
      if (!carrierValue) {
        setCarrierError("통신사를 선택해주세요.");
        setError("carrier", {
          type: "manual",
          message: "통신사를 선택해주세요.",
        });
      } else {
        clearErrors("carrier");
        setCarrierError("");
      }

      if (!gender) {
        setError("gender", {
          type: "manual",
          message: "성별은 필수 입력 항목입니다.",
        });
      }
    }
  }, [phoneNumberValue, carrierValue, gender, setError, clearErrors]);

  useEffect(() => {
    if (carrierValue && !gender) {
      setError("gender", {
        type: "manual",
        message: "성별은 필수 입력 항목입니다.",
      });
    } else {
      clearErrors("gender");
    }
  }, [carrierValue, gender, setError, clearErrors]);

  // 인증 후 인증번호 인풋 닫음
  useEffect(() => {
    if (isVerified) {
      setShowVerificationInput(false);
    }
  }, [isVerified]);

  // 인증제한시간
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft !== null) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime !== null && prevTime > 0) {
            return prevTime - 1;
          } else {
            dispatch(setVerificationExpired());
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, dispatch]);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // 인증번호 요청했을 때
  const handleClickRequest = () => {
    const phoneNumber = watch("phoneNumber");
    if (phoneNumber) {
      dispatch(sendVerificationRequest({ phoneNumber }));
      setTimeLeft(179);
      setShowVerificationInput(true);
      setIsDisabled(true);
    }
  };

  // 인증번호 입력 후 확인 눌렀을 때
  const handleVerifyCode = (data: any) => {
    const response = dispatch(
      verifyCodeRequest({
        phoneNumber: data.phoneNumber,
        code: data.verificationCode,
      })
    );
    if (response.payload.isVerified) {
      setVerificationError(null);
    } else {
      setVerificationError("인증번호가 다릅니다.");
    }
  };

  const onSubmit = async (data: any) => {
    if (!session) {
      console.log("No session found");
      return;
    }

    try {
      const response = await axios.patch(
        "https://aptner.site/v1/api/members/my-pages/phone",
        {
          phone: phone,
          verificationCode: data.verificationCode,
          newphone: data.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="w-full h-full flex justify-center items-center z-40 fixed top-0 left-0 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-[1135px] h-[820px] bg-white rounded-[5px] p-[45px] flex flex-col justify-between items-center"
        onClick={stopPropagation}
      >
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={onClose}
        >
          <IoClose className="text-2xl" />
        </div>
        <div className="w-full flex justify-center p-5">
          <div className="w-full flex flex-col gap-20">
            <div className="flex justify-between border-b-2 border-solid border-[#000000] py-1">
              <h3 className="text-[42px] font-semibold">본인인증</h3>
            </div>
            <div className="flex flex-col items-center gap-[50px]">
              <form
                className="flex flex-col gap-[16px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex gap-[10px]">
                  <p className="w-[120px] p-[10px]">이름</p>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="이름을 입력하세요"
                      className={`${inputStyle} ${
                        errors.name ? inputErrorStyle : ""
                      } w-[518px] h-[48px] px-[30px]`}
                      {...register("name", {
                        required: "이름은 필수 입력 항목입니다.",
                        pattern: {
                          value: nameRegex,
                          message:
                            "이름은 한글만 입력 가능 하며, 2~6자 이내로 입력해 주세요.",
                        },
                      })}
                      disabled={isDisabled}
                    />
                    {errors.name && (
                      <p className="text-sm text-red">
                        {getErrorMessage(errors.name)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-[10px]">
                  <p className="w-[120px] p-[10px]">주민번호</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-[10px]">
                      <input
                        type="text"
                        placeholder="예)801105"
                        className={`${inputStyle} ${
                          errors.idNumber ? inputErrorStyle : ""
                        } w-[240px] h-[48px] px-[30px]`}
                        {...register("idNumber", {
                          required: "주민번호는 필수 입력 항목입니다.",
                          pattern: {
                            value: idNumberRegex,
                            message:
                              "주민번호 앞자리를 형식에 맞게 입력해주세요.",
                          },
                        })}
                        disabled={isDisabled}
                      />
                      <span className="mx-[20px] text-gray_06">-</span>
                      <input
                        type="text"
                        className={`${inputStyle} ${
                          errors.idNumberSuffix ? inputErrorStyle : ""
                        } w-[54px] h-[48px] px-[22px]`}
                        {...register("idNumberSuffix", {
                          required: "주민번호 뒷자리는 필수 입력 항목입니다.",
                          pattern: {
                            value: idNumberSuffixRegex,
                            message:
                              "주민번호 뒷자리에 숫자만 입력 가능합니다.",
                          },
                        })}
                        disabled={isDisabled}
                      />
                      <span className="text-gray_06">******</span>
                    </div>
                    <div>
                      {errors.idNumber && (
                        <p className="text-sm text-red">
                          {getErrorMessage(errors.idNumber)}
                        </p>
                      )}
                      {errors.idNumberSuffix && (
                        <p className="text-sm text-red">
                          {getErrorMessage(errors.idNumberSuffix)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-[10px]">
                  <p className="w-[120px] p-[10px]">성별</p>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "성별은 필수 입력 항목입니다." }}
                    render={({ field }) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex">
                          <button
                            type="button"
                            className={`${
                              field.value === "male"
                                ? buttonClickedStyle
                                : buttonStyle
                            } rounded-l-lg`}
                            onClick={() => {
                              field.onChange("male");
                              setGender("male");
                            }}
                            disabled={isDisabled}
                          >
                            남성
                          </button>
                          <button
                            type="button"
                            className={`${
                              field.value === "female"
                                ? buttonClickedStyle
                                : buttonStyle
                            } rounded-r-lg`}
                            onClick={() => {
                              field.onChange("female");
                              setGender("female");
                            }}
                            disabled={isDisabled}
                          >
                            여성
                          </button>
                        </div>
                        {errors.gender && (
                          <p className="text-sm text-red">
                            {getErrorMessage(errors.gender)}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className="flex gap-[10px]">
                  <p className="w-[120px] p-[10px]">통신사 선택</p>
                  <Controller
                    name="carrier"
                    control={control}
                    rules={{ required: "통신사는 필수 입력 항목입니다." }}
                    render={({ field }) => (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                          <label>
                            <input
                              type="radio"
                              {...field}
                              value="KT"
                              checked={field.value === "KT"}
                              disabled={isDisabled}
                            />{" "}
                            KT
                          </label>
                          <label>
                            <input
                              type="radio"
                              {...field}
                              value="LG U+"
                              checked={field.value === "LG U+"}
                              disabled={isDisabled}
                            />{" "}
                            LG U+
                          </label>
                          <label>
                            <input
                              type="radio"
                              {...field}
                              value="SKT"
                              checked={field.value === "SKT"}
                              disabled={isDisabled}
                            />{" "}
                            SKT
                          </label>
                        </div>
                        <div className="flex gap-4">
                          <label>
                            <input
                              type="radio"
                              {...field}
                              value="KT 알뜰폰"
                              checked={field.value === "KT 알뜰폰"}
                              disabled={isDisabled}
                            />{" "}
                            KT 알뜰폰
                          </label>
                          <label>
                            <input
                              type="radio"
                              {...field}
                              value="LG U+ 알뜰폰"
                              checked={field.value === "LG U+ 알뜰폰"}
                              disabled={isDisabled}
                            />{" "}
                            LG U+ 알뜰폰
                          </label>
                          <label>
                            <input
                              type="radio"
                              {...field}
                              value="SKT 알뜰폰"
                              checked={field.value === "SKT 알뜰폰"}
                              disabled={isDisabled}
                            />{" "}
                            SKT 알뜰폰
                          </label>
                        </div>
                        {carrierError && (
                          <p className="text-sm text-red">{carrierError}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className="flex gap-[10px]">
                  <p className="w-[120px] p-[10px]">휴대폰 번호</p>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="-없이 입력"
                      className={`${inputStyle} ${
                        errors.phoneNumber ? inputErrorStyle : ""
                      } w-[386px] h-[48px] px-[30px]`}
                      {...register("phoneNumber", {
                        required: "휴대폰 번호는 필수 입력 항목입니다.",
                        pattern: {
                          value: phoneNumberRegex,
                          message: "휴대폰 번호를 형식에 맞게 입력해 주세요.",
                        },
                      })}
                      disabled={isDisabled}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-red">
                        {getErrorMessage(errors.phoneNumber)}
                      </p>
                    )}
                    {isVerified && (
                      <p className="text-sm text-blue-500">
                        인증이 완료되었습니다.
                      </p>
                    )}
                  </div>
                  <SmallBorderButton
                    text={showVerificationInput ? "재전송" : "인증번호 요청"}
                    size="sm"
                    onClick={handleClickRequest}
                  />
                </div>
                {showVerificationInput && (
                  <div className="flex gap-[10px] ml-[130px]">
                    <div className="flex flex-col gap-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="인증번호를 입력하세요"
                          className={`${inputStyle} ${
                            errors.verificationCode ||
                            verificationError ||
                            isExpired
                              ? inputErrorStyle
                              : ""
                          } w-[430px] h-[48px] px-[30px]`}
                          {...register("verificationCode", {
                            required: "인증번호는 필수 입력 항목입니다.",
                            pattern: {
                              value: verificationCodeRegex,
                              message: "인증번호를 형식에 맞게 입력해주세요.",
                            },
                          })}
                        />
                        <span
                          className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                            timeLeft === 0 ? "text-red" : "text-gray-500"
                          }`}
                        >
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                      {verificationError && (
                        <p className="text-sm text-red">{verificationError}</p>
                      )}
                      {isExpired && (
                        <p className="text-sm text-red">
                          인증시간이 초과되었습니다.
                        </p>
                      )}
                      {errors.verificationCode && (
                        <p className="text-sm text-red">
                          {getErrorMessage(errors.verificationCode)}
                        </p>
                      )}
                    </div>
                    <SmallBorderButton
                      text="확인"
                      size="sm"
                      onClick={handleSubmit(handleVerifyCode)}
                    />
                  </div>
                )}
                <div className="flex justify-center">
                  <ColorButton
                    text="변경 하기"
                    size="lg"
                    disabled={!isValid || !isVerified}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
