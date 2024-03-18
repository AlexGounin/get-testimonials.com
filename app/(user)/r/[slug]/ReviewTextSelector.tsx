import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export type ReviewTextSelectorProps = {};

export const ReviewTextSelector = (props: ReviewTextSelectorProps) => {
  return (
    <Tabs value='audio'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='audio'>Audio Note</TabsTrigger>
        <TabsTrigger value='text'>Text</TabsTrigger>
      </TabsList>
      <TabsContent value='audio' className='flex flex-col gap-2'>
        <AudioRecorderControl onAudioFinish={(blob) => console.log(blob)} />
        <p className='max-w-sm text-center text-sm font-light text-muted-foreground'>
          Just record your thoughts and we will convert it ot text for
        </p>
      </TabsContent>
      <TabsContent value='text'></TabsContent>
    </Tabs>
  );
};

const AudioRecorderControl = ({
  onAudioFinish,
}: {
  onAudioFinish: (blob: Blob) => void;
}) => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const recorderControls = useAudioRecorder();

  return (
    <div className='flex flex-col items-center gap-2'>
      {blob && <audio controls src={URL.createObjectURL(blob)}></audio>}
      <AudioRecorder
        onRecordingComplete={(blob) => {
          onAudioFinish(blob);
          setBlob(blob);
        }}
        recorderControls={recorderControls}
      />
      {recorderControls.isRecording && (
        <Button
          variant={'default'}
          size={'sm'}
          onClick={recorderControls.stopRecording}
        >
          Stop recording
        </Button>
      )}
      {blob ? (
        <Button
          variant={'default'}
          size={'sm'}
          onClick={recorderControls.stopRecording}
        >
          Submit
        </Button>
      ) : null}
    </div>
  );
};
