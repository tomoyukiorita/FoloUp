"use client";

import { useInterviews } from "@/contexts/interviews.context";
import { useEffect, useState } from "react";
import Call from "@/components/call";
import Image from "next/image";
import { ArrowUpRightSquareIcon } from "lucide-react";
import { Interview } from "@/types/interview";
import LoaderWithText from "@/components/loaders/loader-with-text/loaderWithText";

type Props = {
  params: {
    interviewId: string;
  };
};

type PopupProps = {
  title: string;
  description: string;
  image: string;
};

function PopupLoader() {
  return (
    <div className="bg-white rounded-md absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-[80%] w-[90%]">
      <div className="h-[88vh] justify-center items-center rounded-lg border-2 border-b-4 border-r-4 border-black font-bold transition-all md:block dark:border-white">
        <div className="relative flex flex-col items-center justify-center h-full">
          <LoaderWithText />
        </div>
      </div>
      <a
        className="flex flex-row justify-center align-middle mt-3"
        href=""
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-center text-md font-semibold mr-2">
          Powered by{" "}
          <span className="font-bold">
            Mis<span className="text-indigo-600">Eco</span>
          </span>
        </div>
        <ArrowUpRightSquareIcon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-indigo-500" />
      </a>
    </div>
  );
}

function PopUpMessage({ title, description, image }: PopupProps) {
  return (
    <div className="bg-white rounded-md absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-[80%] w-[90%]">
      <div className="h-[88vh] content-center rounded-lg border-2 border-b-4 border-r-4 border-black font-bold transition-all  md:block dark:border-white ">
        <div className="flex flex-col items-center justify-center my-auto">
          <Image
            src={image}
            alt="Graphic"
            width={200}
            height={200}
            className="mb-4"
          />
          <h1 className="text-md font-medium mb-2">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <a
        className="flex flex-row justify-center align-middle mt-3"
        href=""
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-center text-md font-semibold mr-2">
          Powered by{" "}
          <span className="font-bold">
            Mis<span className="text-indigo-600">Eco</span>
          </span>
        </div>
        <ArrowUpRightSquareIcon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-indigo-500" />
      </a>
    </div>
  );
}

function InterviewInterface({ params }: Props) {
  const [interview, setInterview] = useState<Interview>();
  const [isActive, setIsActive] = useState(true);
  const { getInterviewById } = useInterviews();
  const [interviewNotFound, setInterviewNotFound] = useState(false);
  useEffect(() => {
    if (interview) {
      setIsActive(interview?.is_active === true);
    }
  }, [interview, params.interviewId]);

  useEffect(() => {
    const fetchinterview = async () => {
      try {
        const response = await getInterviewById(params.interviewId);
        if (response) {
          setInterview(response);
          document.title = response.name;
        } else {
          setInterviewNotFound(true);
        }
      } catch (error) {
        console.error(error);
        setInterviewNotFound(true);
      }
    };

    fetchinterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="hidden md:block p-8 mx-auto form-container">
        {!interview ? (
          interviewNotFound ? (
            <PopUpMessage
              title="無効なURL"
              description="アクセスしようとしている面接リンクは無効です。URLを確認して再度お試しください。"
              image="/invalid-url.png"
            />
          ) : (
            <PopupLoader />
          )
        ) : !isActive ? (
          <PopUpMessage
            title="面接は現在利用できません"
            description="現在、応募を受け付けておりません。詳細は応募企業にお問い合わせください。"
            image="/closed.png"
          />
        ) : (
          <Call interview={interview} />
        )}
      </div>
      <div className=" md:hidden flex flex-col items-center md:h-[0px] justify-center  my-auto">
        <div className="mt-48 px-3">
          <p className="text-center my-5 text-md font-semibold">
            {interview?.name}
          </p>
          <p className="text-center text-gray-600 my-5">
            面接に回答するにはPCをご使用ください。ご不便をおかけして申し訳ございません。{" "}
          </p>
        </div>
        <div className="text-center text-md font-semibold mr-2 my-5">
          Powered by{" "}
          <a
            className="font-bold underline"
            href=""
            target="_blank"
          >
            Mis<span className="text-indigo-600">Eco</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default InterviewInterface;
