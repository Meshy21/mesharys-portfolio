import fs from 'fs';
import path from 'path';
import { PortfolioData, ContactFormMessage } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'src/lib/portfolio-data.json');
const MESSAGES_FILE = path.join(process.cwd(), 'src/lib/messages.json');

export function getPortfolioData(): PortfolioData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content) as PortfolioData;
    }
  } catch (error) {
    console.error('Error reading portfolio data, using default fallback:', error);
  }

  // Fallback to empty/default if somehow file reading fails
  return {
    hero: {
      headline: "Meshary A. Aquino",
      tagline: "Computer Engineer | Mobile Developer",
      bio: "IT Specialist and Computer Engineer",
      image: ""
    },
    skills: [],
    projects: [],
    contact: {
      location: "",
      email: "",
      linkedin: "",
      phone: "",
      cvLink: ""
    }
  };
}

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing portfolio data:', error);
    return false;
  }
}

export function getContactMessages(): ContactFormMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const content = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(content) as ContactFormMessage[];
    }
  } catch (error) {
    console.error('Error reading messages file:', error);
  }
  return [];
}

export function saveContactMessage(message: Omit<ContactFormMessage, 'id' | 'timestamp'>): ContactFormMessage {
  const messages = getContactMessages();
  const newMessage: ContactFormMessage = {
    ...message,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString()
  };
  messages.unshift(newMessage); // latest first
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving contact message:', error);
  }
  return newMessage;
}

export function deleteContactMessage(id: string): boolean {
  const messages = getContactMessages();
  const filtered = messages.filter(m => m.id !== id);
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return false;
  }
}
