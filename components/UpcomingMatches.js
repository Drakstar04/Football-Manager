import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

export default function UpcomingMatches({ matches }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Matches</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllBtn}>See all</Text>
        </TouchableOpacity>
      </View>
      {matches.map((match) => (
        <View key={match.id} style={styles.upcomingMatchCard}>
          <View style={styles.upcomingMatchMain}>
            <View style={styles.upcomingTeamContainerHome}>
              <Text style={[styles.upcomingTeamName, styles.homeTeamName]}>{match.homeTeam}</Text>
              <Image source={match.logoHomeTeam} style={styles.upcomingTeamLogo} />
            </View>
            <View style={styles.upcomingTimeContainer}>
              <Text style={styles.upcomingTimeText}>{match.time}</Text>
              <Text style={styles.upcomingDateText}>{match.date}</Text>
            </View>
            <View style={styles.upcomingTeamContainerAway}>
              <Image source={match.logoAwayTeam} style={styles.upcomingTeamLogo} />
              <Text style={[styles.upcomingTeamName, styles.awayTeamName]}>{match.awayTeam}</Text>
            </View>
          </View>
          <Text style={styles.upcomingStadiumText}>{match.stadium}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#575757',
  },
  seeAllBtn: {
    color: '#8a2be2',
    fontWeight: 'bold',
  },
  upcomingMatchCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 30,
    marginBottom: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#b1b1b1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  upcomingMatchMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  upcomingTeamContainerHome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  upcomingTeamContainerAway: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  upcomingTeamLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  upcomingTeamName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    flex: 1,
  },
  homeTeamName: {
    textAlign: 'right',
    marginRight: 8,
  },
  awayTeamName: {
    textAlign: 'left',
    marginLeft: 8,
  },
  upcomingTimeContainer: {
    alignItems: 'center',
    flex: 1,
  },
  upcomingTimeText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 20,
  },
  upcomingDateText: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  upcomingStadiumText: {
    fontSize: 12,
    color: '#aaa',
  }
});
