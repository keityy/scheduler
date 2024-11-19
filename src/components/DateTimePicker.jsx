import React, { useState } from 'react';
import Calendar from '@/components/ui/calendar'; // この行を修正
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const DateTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('13:00');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [timeFormat, setTimeFormat] = useState('start');

  const handleDateChange = (newDate) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleStartTimeChange = (newTime) => {
    setStartTime(newTime);
  };

  const handleEndTimeChange = (newTime) => {
    setEndTime(newTime);
  };

  const handleAddDateTime = () => {
    if (date) {
      const formattedDate = format(date, 'M月d日', { locale: ja });
      let newDateTime = `${formattedDate} ${startTime}`;
      if (timeFormat === 'start-end') {
        newDateTime += ` - ${endTime}`;
      }
      newDateTime += '\n';
      setSelectedDateTime(prevState => prevState + newDateTime);
    }
  };

  const handleRemoveLastLine = () => {
    const lines = selectedDateTime.split('\n');
    if (lines.length > 1) {
      lines.splice(-2, 1);
      setSelectedDateTime(lines.join('\n'));
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(selectedDateTime.trim()).then(() => {
      alert('テキストがクリップボードにコピーされました。');
    }).catch(err => {
      console.error('コピーに失敗しました:', err);
    });
  };

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      timeOptions.push(`${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">予定調整日時選択</h1>
      <div className="mb-4 border rounded-lg shadow-sm">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="rounded-md"
          locale={ja}
          weekStartsOn={0}
          defaultMonth={date}
          initialFocus={true}
        />
      </div>
      <div className="mb-4">
        <RadioGroup defaultValue="start" onValueChange={setTimeFormat}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="start" id="start" />
            <Label htmlFor="start">開始時刻のみ</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="start-end" id="start-end" />
            <Label htmlFor="start-end">開始時刻と終了時刻</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="mb-4">
        <Label>開始時刻</Label>
        <Select onValueChange={handleStartTimeChange} value={startTime}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="開始時間を選択" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {timeFormat === 'start-end' && (
        <div className="mb-4">
          <Label>終了時刻</Label>
          <Select onValueChange={handleEndTimeChange} value={endTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="終了時間を選択" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Button onClick={handleAddDateTime} className="w-full mb-4">日時を追加</Button>
      <div className="relative mb-4">
        <Textarea
          value={selectedDateTime}
          onChange={(e) => setSelectedDateTime(e.target.value)}
          placeholder="選択した日時がここに表示されます"
          rows={5}
          className="w-full p-2 border rounded"
        />
        <Button 
          onClick={handleRemoveLastLine}
          className="absolute top-2 right-2 p-2 text-xs"
          variant="outline"
        >
          1行消去
        </Button>
      </div>
      <Button onClick={handleCopyText} className="w-full flex items-center justify-center">
        <Copy className="mr-2 h-4 w-4" /> コピー
      </Button>
    </div>
  );
};

export default DateTimePicker;