import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UpcomingMatches from '../components/UpcomingMatches';

const LEAGUES = [
  { id: 'ucl', name: 'UCL', logo: require('../assets/img/leagues/ucl.png') },
  { id: 'epl', name: 'EPL', logo: require('../assets/img/leagues/epl.png') },
  { id: 'laliga', name: 'La Liga', logo: require('../assets/img/leagues/laliga.png') },
  { id: 'seriea', name: 'Serie A', logo: require('../assets/img/leagues/seriea.png') },
  { id: 'ligue1', name: 'Ligue 1', logo: require('../assets/img/leagues/ligue1.png') }
];
const LIVE_MATCHES = [
  { 
    id: '1', 
    league: 'UCL', 
    matchday: 'Quarter-Finals', 
    homeTeam: 'Real Madrid', 
    awayTeam: 'Man City', 
    homeScore: 1, 
    awayScore: 1, 
    time: "65'", 
    stadium: 'Santiago Bernabéu',
    logoHomeTeam: require('../assets/img/teams/realmadrid.png'),
    logoAwayTeam: require('../assets/img/teams/mancity.png'),
    leagueLogo: require('../assets/img/leagues/ucl.png')
  }, 
  { 
    id: '2', 
    league: 'UCL', 
    matchday: 'Quarter-Finals', 
    homeTeam: 'Arsenal', 
    awayTeam: 'Bayern', 
    homeScore: 0, 
    awayScore: 2, 
    time: 'HT', 
    stadium: 'Emirates Stadium',
    logoHomeTeam: require('../assets/img/teams/arsenal.png'),
    logoAwayTeam: require('../assets/img/teams/bayern.png'),
    leagueLogo: require('../assets/img/leagues/ucl.png')
  }
];
const UPCOMING_MATCHES = [
  { 
    id: '1', 
    homeTeam: 'Real Madrid', 
    awayTeam: 'Man City', 
    time: '21:00', 
    date: '25 Mars', 
    stadium: 'Santiago Bernabéu',
    logoHomeTeam: require('../assets/img/teams/realmadrid.png'),
    logoAwayTeam: require('../assets/img/teams/mancity.png')
  }, 
  { 
    id: '2', 
    homeTeam: 'Arsenal', 
    awayTeam: 'Bayern', 
    time: '21:00', 
    date: 'Demain', 
    stadium: 'Emirates Stadium',
    logoHomeTeam: require('../assets/img/teams/arsenal.png'),
    logoAwayTeam: require('../assets/img/teams/bayern.png') 
  },
  { 
    id: '3', 
    homeTeam: 'AC Milan', 
    awayTeam: 'Inter Milan', 
    time: '20:45', 
    date: 'Samedi', 
    stadium: 'San Siro',
    logoHomeTeam: require('../assets/img/teams/acmilan.png'),
    logoAwayTeam: require('../assets/img/teams/intermilan.png') 
  },
  { 
    id: '4', 
    homeTeam: 'Atlético Madrid', 
    awayTeam: 'Real Madrid', 
    time: '21:00', 
    date: 'Dimanche', 
    stadium: 'Cívitas Metropolitano',
    logoHomeTeam: require('../assets/img/teams/atleticomadrid.png'),
    logoAwayTeam: require('../assets/img/teams/realmadrid.png') 
  }
];

export default function MatchScreen() {
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0].id);

 return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section Ligues */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.leaguesWrapper}
          data={LEAGUES}
          keyExtractor={(item) => item.id}
          renderItem={({ item: league }) => {
            const isSelected = selectedLeague === league.id;
            return (
              <TouchableOpacity 
                style={[styles.leagueBtn, isSelected && styles.leagueBtnSelected]}
                onPress={() => setSelectedLeague(league.id)}
              >
                <Image source={league.logo} style={[styles.logoImage, isSelected && { tintColor: '#dadada' }]} />
                <Text style={[styles.leagueText, isSelected && styles.leagueTextSelected]}>
                  {league.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Section Live Matches */}
        <View style={styles.section}>
          <View style={styles.sectionTitleWrapper}>
            <Text style={styles.sectionTitle}>Live Matches</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.liveMatchList}
            data={LIVE_MATCHES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <LinearGradient colors={['#6802b1', '#bd76f8']} style={styles.liveMatchCard}>
                {/* Image de fond (Filigrane) */}
                <Image source={item.leagueLogo} style={styles.liveMatchBgLogo1} />
                <Image source={item.leagueLogo} style={styles.liveMatchBgLogo2} />

                {/* En-tête : Ligue et Journée */}
                <Text style={styles.liveMatchLeague}>{item.league}</Text>
                <Text style={styles.liveMatchMatchday}>{item.matchday}</Text>
                
                {/* Corps : Équipes, Score et Temps */}
                <View style={styles.liveMatchTeamsContainer}>
                  <View style={styles.teamContainer}>
                    <Image source={item.logoHomeTeam} style={styles.teamLogo} />
                    <Text style={styles.teamName}>{item.homeTeam}</Text>
                  </View>
                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{item.homeScore} - {item.awayScore}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                  <View style={styles.teamContainer}>
                    <Image source={item.logoAwayTeam} style={styles.teamLogo} />
                    <Text style={styles.teamName}>{item.awayTeam}</Text>
                  </View>
                </View>

                {/* Pied de page : Stade */}
                <Text style={styles.stadiumText}>{item.stadium}</Text>
              </LinearGradient>
            )}
          />
        </View>

        {/* Section Upcoming Matches */}
        <UpcomingMatches matches={UPCOMING_MATCHES} />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 120,
  },
  leaguesWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  leagueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    shadowColor: '#b1b1b1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  leagueBtnSelected: {
    backgroundColor: '#8a2be2',
  },
  logoImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
    tintColor: '#888', 
  },
  leagueText: {
    color: '#888',
    fontWeight: 'bold',
  },
  leagueTextSelected: {
    color: '#ffffff', 
  },
  section: {
    marginBottom: 25,
  },
  sectionTitleWrapper: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#575757',
  },
  liveMatchList: {
    paddingLeft: 15,
  },
  liveMatchCard: {
    padding: 15,
    borderRadius: 30,
    marginRight: 15,
    marginTop: 15,
    width: 280,
    alignItems: 'center',
    overflow: 'hidden',
  },
  liveMatchBgLogo1: {
    position: 'absolute',
    bottom: -10,
    left: 180,
    width: 120,
    height: 130,
    opacity: 0.15,
    resizeMode: 'contain',
    transform: [{ rotate: '-10deg' }],
  },
  liveMatchBgLogo2: {
    position: 'absolute',
    bottom: -20, 
    left: 0,
    width: 120,
    height: 260,
    opacity: 0.15,
    resizeMode: 'contain',
    transform: [{ rotate: '-10deg' }],
  },
  liveMatchLeague: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  liveMatchMatchday: {
    fontSize: 12,
    color: '#c4c4c4',
    marginBottom: 10,
  },
  liveMatchTeamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    flex: 1,
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  stadiumText: {
    fontSize: 12,
    color: '#c4c4c4',
  },
  timeText: {
    color: '#c4c4c4',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
  },
});
