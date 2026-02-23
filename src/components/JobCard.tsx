import { useState } from 'react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string, repoUrl: string) => Promise<void>;
}

export const JobCard = ({ job, onApply }: JobCardProps) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();
    if (!repoUrl) return alert('Por favor, ingresa la URL de tu repo');
    
    setSubmitting(true);
    await onApply(job.id, repoUrl);
    setSubmitting(false);
  };

  return (
    <div style={{ 
      border: '1px solid #444', 
      padding: '16px', 
      borderRadius: '8px', 
      marginBottom: '12px',
      textAlign: 'left' 
    }}>
      <h3>{job.title}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <input
          type="url"
          placeholder="https://github.com/PabloALiano/nimble-gravity-challenge"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px' }}
        />
        <button 
          type="submit" 
          disabled={submitting}
          style={{ 
            backgroundColor: submitting ? '#666' : '#646cff',
            color: 'white',
            padding: '8px',
            cursor: submitting ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? 'Enviando...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};