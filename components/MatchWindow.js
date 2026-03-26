import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

export default function MatchWindow() {
  const [matchData, setMatchData] = useState({
    home: 'PSG',
    away: 'Marseille',
    scoreHome: 0,
    scoreAway: 0,
    status: 'Prêt',
    minute: 0,
    // J'utilise l'icône par défaut de l'app en attendant que vous ayez les logos du PSG et de l'OM
    logoHome: require('../assets/img/teams/psg.png'),
    logoAway: require('../assets/img/teams/om.png'),
  });

  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // Permet de stocker l'ID de l'intervalle

  // Nettoyage de l'intervalle si le composant est détruit
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startSimulation = () => {
    if (isRunning) return;

    setIsRunning(true);
    setMatchData(prev => ({
      ...prev,
      status: 'En cours',
      minute: 1,
      scoreHome: 0,
      scoreAway: 0,
    }));

    intervalRef.current = setInterval(() => {
      setMatchData(prev => {
        if (prev.minute >= 90) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return { ...prev, status: 'Terminé' };
        }

        const homeGoal = Math.random() < 0.015;
        const awayGoal = !homeGoal && Math.random() < 0.015;

        return {
          ...prev,
          minute: prev.minute + 1,
          scoreHome: prev.scoreHome + (homeGoal ? 1 : 0),
          scoreAway: prev.scoreAway + (awayGoal ? 1 : 0),
        };
      });
    }, 1000);
  };

  return (
    <View style={styles.matchWindowCard}>
      <View style={styles.scoreboard}>
        {/* Équipe Domicile */}
        <View style={styles.teamContainer}>
          <Image source={matchData.logoHome} style={styles.teamLogo} />
          <Text style={styles.teamName}>{matchData.home}</Text>
        </View>

        {/* Score et Chrono au centre */}
        <View style={styles.centerContainer}>
          <Text style={styles.scoreText}>
            {matchData.scoreHome} - {matchData.scoreAway}
          </Text>
          <Text style={styles.timeText}>
            {matchData.minute > 0 ? `${matchData.minute}'` : ''}
          </Text>
          <Text style={styles.statusText}>{matchData.status}</Text>
        </View>

        {/* Équipe Extérieur */}
        <View style={styles.teamContainer}>
          <Image source={matchData.logoAway} style={styles.teamLogo} />
          <Text style={styles.teamName}>{matchData.away}</Text>
        </View>
      </View>

      {/* Bouton de lancement */}
      <TouchableOpacity 
        style={[styles.simButton, isRunning && styles.simButtonDisabled]} 
        onPress={startSimulation}
        disabled={isRunning}
      >
        <Text style={styles.simButtonText}>
          {isRunning ? 'Simulation en cours...' : 'Lancer la simulation'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  matchWindowCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 30,
    marginHorizontal: 15,
    marginTop: 100,
    marginBottom: 25,
    alignItems: 'center',
    shadowColor: '#b1b1b1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  scoreboard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    marginBottom: 20 
},
  teamContainer: { 
    alignItems: 'center', 
    flex: 1 
},
  teamLogo: { 
    width: 60, 
    height: 60, 
    resizeMode: 'contain', 
    marginBottom: 8 
},
  teamName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#444', 
    textAlign: 'center' 
},
  centerContainer: { 
    alignItems: 'center', 
    flex: 1 
},
  scoreText: { fontSize: 36, 
    fontWeight: 'bold', 
    color: '#333' 
},
  timeText: { fontSize: 18, 
    fontWeight: 'bold', 
    color: '#8a2be2', 
    marginTop: 4 
},
  statusText: { 
    fontSize: 12, 
    color: '#888', 
    marginTop: 4, 
    textTransform: 'uppercase', 
    fontWeight: 'bold' 
},
  simButton: { 
    backgroundColor: '#8a2be2', 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 25, 
    width: '80%', 
    alignItems: 'center' 
},
  simButtonDisabled: { 
    backgroundColor: '#cccccc' 
},
  simButtonText: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 16 
},
});
