import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export type ReviewTextSelectorProps = {
  productId: string;
  onInputSend: (input: string) => void;
};

export const ReviewTextSelector = (props: ReviewTextSelectorProps) => {
  return (
    <div className='w-full max-w-lg'>
      <Tabs defaultValue='audio'>
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
        <TabsContent value='text'>
          <InputControl onInputSend={props.onInputSend} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const InputControl = ({
  onInputSend,
}: {
  onInputSend: (input: string) => void;
}) => {
  const [input, setInput] = useState('');
  return (
    <div className='flex flex-col gap-2'>
      <Textarea
        placeholder='Write your review here'
        className='w-full bg-accent/50'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        variant='default'
        size='sm'
        onClick={() => {
          onInputSend(input);
        }}
      >
        Submit
      </Button>
    </div>
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
