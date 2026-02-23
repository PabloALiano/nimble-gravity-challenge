import { useState, useEffect } from 'react';
import { apiService } from './services/api';
import { JobCard } from './components/JobCard';
import type { Candidate, Job } from './types';
import './App.css';

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const MY_EMAIL = "pabloaliano@gmail.com"; 

  useEffect(() => {
    const initChallenge = async () => {
      try {
        setLoading(true);
          const [candidateData, jobsData] = await Promise.all([
          apiService.getCandidate(MY_EMAIL),
          apiService.getJobs()
        ]);
        
        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error inesperado');
      } finally {
        setLoading(false);
      }
    };

    initChallenge();
  }, []);

  const handleApply = async (jobId: string, repoUrl: string) => {
    if (!candidate) return;

    try {
      const response = await apiService.applyToJob({
        uuid: candidate.uuid,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        jobId: jobId,
        repoUrl: repoUrl
      });

      if (response.ok) {
        alert('¡Postulación enviada con éxito!');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al postular');
    }
  };

  if (loading) return <div className="loader">Cargando desafío...</div>;
  if (error) return <div className="error-message">❌ Error: {error}</div>;

  return (
    <div className="container">
      <header>
        <h1>Nimble Gravity Challenge</h1>
        {candidate && (
          <div className="candidate-info">
            <p><strong>Candidato:</strong> {candidate.firstName} {candidate.lastName}</p>
            <p><strong>Email:</strong> {candidate.email}</p>
          </div>
        )}
      </header>

      <main>
        <h2>Posiciones Disponibles</h2>
        <div className="job-list">
          {jobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onApply={handleApply} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;