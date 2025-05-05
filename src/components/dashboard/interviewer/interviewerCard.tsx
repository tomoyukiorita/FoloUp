import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Modal from "@/components/dashboard/Modal";
import { Interviewer } from "@/types/interviewer";
import InterviewerDetailsModal from "@/components/dashboard/interviewer/interviewerDetailsModal";
import { Info, Trash2 } from "lucide-react";
import { InterviewerService } from "@/services/interviewers.service";
import { toast } from "sonner";
import { useInterviewers } from "@/contexts/interviewers.context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  interviewer: Interviewer;
}

const InterviewerCard = ({ interviewer }: Props) => {
  const [open, setOpen] = useState(false);
  const { fetchInterviewers } = useInterviewers();

  const handleDelete = async () => {
    try {
      const result = await InterviewerService.deleteInterviewer(interviewer.id);
      
      if (result.success) {
        await fetchInterviewers();
        toast.success("面接官を削除しました", {
          position: "bottom-right",
          duration: 3000,
        });
      } else {
        toast.error(result.error || "面接官の削除に失敗しました", {
          position: "bottom-right",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error deleting interviewer:", error);
      toast.error("面接官の削除中にエラーが発生しました", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Card
        className="p-0 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300 h-40 w-36 ml-1 mr-3 rounded-xl shrink-0 overflow-hidden shadow-md relative"
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button 
              className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 hover:bg-red-100"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消すことができません。この面接官は完全に削除されます。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={handleDelete}
              >
                削除する
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <CardContent className="p-0" onClick={() => setOpen(true)}>
          <div className="w-full h-28 overflow-hidden">
            <Image
              src={interviewer.image}
              alt="Picture of the interviewer"
              width={200}
              height={40}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <CardTitle className="mt-3 text-base text-center">
            {interviewer.name}
          </CardTitle>
        </CardContent>
      </Card>
      <Modal
        open={open}
        closeOnOutsideClick={true}
        onClose={() => {
          setOpen(false);
        }}
      >
        <InterviewerDetailsModal interviewer={interviewer} />
      </Modal>
    </>
  );
};

export default InterviewerCard;
