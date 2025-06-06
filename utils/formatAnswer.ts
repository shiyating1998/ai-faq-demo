export interface FormattedSegment {
  type: 'text' | 'definition' | 'list' | 'highlight';
  content: string;
  isNumbered?: boolean;
}

export function formatAnswer(answer: string): FormattedSegment[] {
  const segments: FormattedSegment[] = [];
  
  // Split by common separators and patterns
  const lines = answer.split(/[。；]/g).filter(line => line.trim());
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Check for numbered lists (1）、2）、3）等)
    const numberedMatch = line.match(/^(\d+[）\)、])\s*(.+)/);
    if (numberedMatch) {
      segments.push({
        type: 'list',
        content: numberedMatch[2],
        isNumbered: true
      });
      continue;
    }
    
    // Check for bullet points (• 、- 等)
    const bulletMatch = line.match(/^[•\-·]\s*(.+)/);
    if (bulletMatch) {
      segments.push({
        type: 'list',
        content: bulletMatch[1],
        isNumbered: false
      });
      continue;
    }
    
    // Check for definitions (包含"是指"、"是"等定义词)
    if (line.includes('是指') || line.includes('是一个') || line.includes('包括')) {
      segments.push({
        type: 'definition',
        content: line
      });
      continue;
    }
    
    // Check for highlights (包含"主要"、"核心"、"重要"等关键词)
    if (line.includes('主要') || line.includes('核心') || line.includes('重要') || line.includes('关键')) {
      segments.push({
        type: 'highlight',
        content: line
      });
      continue;
    }
    
    // Default to regular text
    segments.push({
      type: 'text',
      content: line
    });
  }
  
  return segments;
}

export function extractKeyPoints(answer: string): string[] {
  const keyPoints: string[] = [];
  
  // Extract numbered points
  const numberedMatches = answer.match(/\d+[）\)、]\s*[^。；]+/g);
  if (numberedMatches) {
    keyPoints.push(...numberedMatches.map(match => 
      match.replace(/^\d+[）\)、]\s*/, '').trim()
    ));
  }
  
  // Extract bullet points
  const bulletMatches = answer.match(/[•\-·]\s*[^。；]+/g);
  if (bulletMatches) {
    keyPoints.push(...bulletMatches.map(match => 
      match.replace(/^[•\-·]\s*/, '').trim()
    ));
  }
  
  return keyPoints;
} 