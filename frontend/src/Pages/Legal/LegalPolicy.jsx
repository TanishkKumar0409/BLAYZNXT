import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../context/API";
import PageHeader from "../../Components/PageHeader/PageHeader";
import { FileLock2 } from "lucide-react";

export default function LegalPolicy() {
  const { legal } = useParams();
  const [policy, setPolicy] = useState("");

  const getAllPolicy = useCallback(async () => {
    try {
      const response = await API.get(`/legal`);
      const data = response.data;
      setPolicy(
        data.find(
          (item) => legal === item?.title?.toLowerCase().replace(/\s+/g, "-")
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  }, [legal]);

  useEffect(() => {
    getAllPolicy();
  }, [getAllPolicy]);

  return (
    <>
      <PageHeader
        title={policy?.title || legal.replace(/-/g, " ")}
        subtitle="Get in touch with our team for support, inquiries, or feedback"
        backgroundImage="https://images.pexels.com/photos/7713177/pexels-photo-7713177.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />
      <div className="container mx-auto px-4 py-8 min-h-[300px]">
        {policy?.legal_description ? (
          <div
            dangerouslySetInnerHTML={{ __html: policy?.legal_description }}
          />
        ) : (
          <div className="coming-soon-container flex flex-col items-center justify-center min-h-[200px] bg-white rounded-lg p-8 text-center text-gray-800">
            <h2 className="text-5xl font-bold mb-4 text-indigo-900">
              Policy Coming Soon
            </h2>
            <p className="text-lg mb-6 max-w-4xl text-gray-600">
              We're currently working hard to prepare this policy for you.
              Please check back soon for the latest updates. Once the policy is
              available, you’ll receive an email notification to keep you
              informed.
            </p>
            <FileLock2 className="w-50 h-50 text-indigo-500" />
          </div>
        )}
      </div>
    </>
  );
}
