/**
 * 날짜를 YY/MM/DD AM|PM HH:MM 형식으로 포맷팅
 */
export const formatDate = (dateString: string | Date): string => {
  if (!dateString) return 'Invalid Date';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date';

  // YY/MM/DD 형식
  const year = date.getFullYear().toString().slice(2); // 연도 앞 두 자리 제거
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // AM/PM 시간:분 형식
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12; // 12시간제로 변환
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}/${month}/${day} ${ampm} ${hour12}:${minutes}`;
};

/**
 * 남은 시간 계산 - 24시간 이상은 일 단위로 표시
 */
export const getTimeRemaining = (deadline: string | Date): string | null => {
  if (!deadline) return null;

  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) return null;

  const now = new Date();

  const diffTime = deadlineDate.getTime() - now.getTime();
  if (diffTime <= 0) return '기한 만료';

  // 남은 시간 계산
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

  // 24시간 이상이면 일 단위로 표시
  if (diffHours >= 24) {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}일 남음`;
  }

  // 24시간 미만이면 시간:분 단위로 표시
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHours}시간 ${diffMinutes}분 남음`;
};

/**
 * 남은 시간에 따른 색상 결정
 */
export const getTimeColor = (timeText: string | null): string => {
  if (timeText === null) return 'text-gray-500';
  if (timeText === '기한 만료') return 'text-red-500';

  // 일 단위 체크 (예: "3일 남음")
  const daysMatch = timeText.match(/(\d+)일/);
  if (daysMatch) {
    const days = parseInt(daysMatch[1]);
    if (days < 3) return 'text-yellow-600'; // 3일 미만
    if (days < 7) return 'text-blue-600'; // 7일 미만
    return 'text-green-600'; // 7일 이상
  }

  // 시간 단위 체크 (예: "10시간 30분 남음")
  const hoursMatch = timeText.match(/(\d+)시간/);
  if (hoursMatch) {
    const hours = parseInt(hoursMatch[1]);
    if (hours < 12) return 'text-red-500';
    return 'text-orange-500';
  }

  return 'text-gray-500'; // 기본값
};
