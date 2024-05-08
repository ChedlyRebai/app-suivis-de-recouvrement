"use client"; // is needed only if you’re using React Server Components
import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);

const page = () => {
  return (
    <div>
      {" "}
      <lr-config 
      ctx-name="my-uploader" 
      pubkey="ef5a58ad5e0f152d24b9" />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.38.1/web/lr-file-uploader-regular.min.css`}
      />
    </div>
  );
};

export default page;
