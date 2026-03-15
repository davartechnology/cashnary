#!/usr/bin/env node

/**
 * Script de génération automatique d'articles de blog
 * Utilise DeepSeek pour ia-tech et Gemini pour business-en-ligne
 */

import { readFileSync, writeFileSync, mkdirSync, appendFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Groq from 'groq-sdk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Lecture manuelle du .env.local
function loadEnv() {
  try {
    const envPath = join(rootDir, '.env.local')
    const content = readFileSync(envPath, 'utf-8')
    console.log("CONTENU BRUT:", content)
    content.split('\n').forEach(line => {
      line = line.trim()
      if (line && !line.startsWith('#')) {
        const [key, ...rest] = line.split('=')
        const value = rest.join('=').trim()
        process.env[key.trim()] = value
      }
    })
  } catch(e) {
    console.error("Erreur lecture .env.local:", e.message)
  }
}

loadEnv()

console.log("GROQ:", process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.substring(0,8) + "..." : "NON CHARGÉE")
console.log("DEEPSEEK:", process.env.DEEPSEEK_API_KEY ? process.env.DEEPSEEK_API_KEY.substring(0,8) + "..." : "NON CHARGÉE")
console.log("GEMINI:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0,8) + "..." : "NON CHARGÉE")

// Configuration
const CONFIG = {
  contentDir: join(rootDir, 'content'),
  logsDir: join(rootDir, 'logs'),
  errorsLog: join(rootDir, 'logs', 'errors.log'),
  themes: {
    'ia-tech': {
      api: 'deepseek',
      topics: [
        'outils IA pour productivité',
        'automatisation avec intelligence artificielle',
        'nouvelles technologies 2024',
        'GPT et assistants virtuels',
        'machine learning pour débutants'
      ]
    },
    'business-en-ligne': {
      api: 'gemini',
      topics: [
        'gagner de largent en ligne',
        'devenir freelance',
        'e-commerce rentable',
        'créer un SaaS',
        'marketing digital entrepreneurial'
      ]
    }
  }
};

// Log to console with prefix
function log(message) {
  console.log(message);
}

// Log error to file
function logError(message, error) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}: ${error.message}\n${error.stack}\n\n`;
  
  // Ensure logs directory exists
  if (!existsSync(CONFIG.logsDir)) {
    mkdirSync(CONFIG.logsDir, { recursive: true });
  }
  
  appendFileSync(CONFIG.errorsLog, logMessage);
  console.error(`❌ Erreur: ${message}`);
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get date string for filename
function getDateString() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Generate random topic for theme
function getRandomTopic(theme) {
  const topics = CONFIG.themes[theme].topics;
  return topics[Math.floor(Math.random() * topics.length)];
}

// Call Groq API
async function callGrok(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  
  log(`🔍 Groq API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}`);
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY not found in environment variables');
  }

  const groq = new Groq({ apiKey });
  
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "PREMIÈRE LIGNE OBLIGATOIRE : écris un titre court et accrocheur de maximum 80 caractères. Exemples : '5 outils IA pour tripler ta productivité en 2025' 'Comment gagner 1000€/mois avec le freelance en 3 mois' Ne commence JAMAIS par une phrase d'introduction longue. Tu es un expert rédacteur de blog francophone. Rédige un article de blog professionnel en français. Résous un problème EXACT et CONCRET. Entre 600 et 800 mots STRICTEMENT. Utilise OBLIGATOIREMENT ## pour les sous-titres H2 (exemple : ## Titre de section). N'écris JAMAIS 'H2:' en texte brut. N'utilise JAMAIS ** autour du titre principal. Le titre principal doit être sur la première ligne en texte brut sans #. Introduction qui accroche en 2 phrases. 3 à 4 sections avec sous-titres H2. Conclusion avec appel à l'action. Ton : direct, expert, accessible." },
      { role: "user", content: prompt }
    ],
    max_tokens: 1500,
    temperature: 0.7
  });
  
  log(`📡 Groq Status: Success`);
  
  const text = completion.choices[0].message.content;
  
  if (text) {
    return text;
  }
  
  throw new Error('Invalid Groq response: no content');
}

// Call DeepSeek API
async function callDeepSeek(prompt) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  log(`🔍 DeepSeek API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}`);
  
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY not found in environment variables');
  }

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { 
          role: 'system', 
          content: 'Tu es un expert rédacteur de blog francophone spécialisé en intelligence artificielle et nouvelles technologies. Rédige un article de blog professionnel en français. Résous un problème EXACT et CONCRET. Entre 600 et 800 mots STRICTEMENT. Utilise OBLIGATOIREMENT ## pour les sous-titres H2 (exemple : ## Titre de section). N\'écris JAMAIS \'H2:\' en texte brut. N\'utilise JAMAIS ** autour du titre principal. Le titre principal doit être sur la première ligne en texte brut sans #. Introduction qui accroche en 2 phrases. 3 à 4 sections avec sous-titres H2. Conclusion avec appel à l\'action. Ton : direct, expert, accessible. Aucun contenu générique ou bateau.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  log(`📡 DeepSeek Status: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (data.choices && data.choices[0]) {
    return data.choices[0].message.content;
  }
  
  throw new Error('Invalid DeepSeek response: no content');
}

// Call Gemini API
async function callGemini(topic) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  log(`🔍 Gemini API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}`);
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not found in environment variables');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Tu es un expert rédacteur de blog francophone spécialisé en business en ligne et entrepreneuriat digital. Rédige un article de blog professionnel en français. Résous un problème EXACT et CONCRET. Entre 600 et 800 mots STRICTEMENT. Utilise OBLIGATOIREMENT ## pour les sous-titres H2 (exemple : ## Titre de section). N'écris JAMAIS 'H2:' en texte brut. N'utilise JAMAIS ** autour du titre principal. Le titre principal doit être sur la première ligne en texte brut sans #. Introduction qui accroche en 2 phrases. 3 à 4 sections avec sous-titres H2. Conclusion avec appel à l'action. Ton : direct, expert, accessible. Aucun contenu générique ou bateau.\n\nSujet: ${topic}`;

  log(`📡 Appel Gemini avec le sujet: ${topic}`);

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  if (text) {
    return text;
  }
  
  throw new Error('Invalid Gemini response: no content');
}

// Generate article with fallback
async function generateArticle(theme) {
  const topic = getRandomTopic(theme);
  
  let content = null;
  let usedApi = null;
  let error = null;

  // Priority: Grok -> Gemini -> DeepSeek
  try {
    log(`\n🤖 Génération article ${theme} avec Grok...`);
    content = await callGrok(`Rédige un article complet sur le sujet suivant: ${topic}`);
    usedApi = 'Grok';
  } catch (e) {
    log(`⚠️ Grok échoué: ${e.message}`);
    
    // Fallback 1: Gemini
    try {
      log(`🔄 Tentative avec Gemini...`);
      content = await callGemini(topic);
      usedApi = 'Gemini (fallback)';
    } catch (e2) {
      log(`⚠️ Gemini échoué: ${e2.message}`);
      
      // Fallback 2: DeepSeek
      try {
        log(`🔄 Tentative avec DeepSeek...`);
        content = await callDeepSeek(`Rédige un article complet sur le sujet suivant: ${topic}`);
        usedApi = 'DeepSeek (fallback)';
      } catch (e3) {
        log(`⚠️ DeepSeek échoué: ${e3.message}`);
        error = e3;
      }
    }
  }

  if (error) {
    logError(`Échec génération ${theme}`, error);
    throw error;
  }

  return { content, usedApi };
}

function formatArticle(content, theme) {
  // Nettoyer le contenu
  let cleanContent = content
    .replace(/^H2:\s*/gm, '## ')
    .replace(/^\*\*(.*?)\*\*$/gm, '$1')

  const lines = cleanContent.split('\n');
  let title = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('---')) continue;
    if (trimmed.startsWith('# ')) {
      title = trimmed.substring(2).trim().replace(/\*\*/g, '');
      break;
    }
    // Titre = première ligne courte (moins de 100 caractères)
    if (trimmed.length < 100 && !trimmed.startsWith('##')) {
      title = trimmed.replace(/\*\*/g, '');
      break;
    }
  }
  // Si toujours pas de titre court, génère un titre depuis le topic
  if (!title || title.length > 100) {
    title = 'Article CASHNARY ' + getDateString()
  }

  const slug = generateSlug(title).substring(0, 60).replace(/-+$/g, '')
  const date = getDateString();
  const wordCount = cleanContent.split(/\s+/).filter(w => w.length > 0).length;

  const description = cleanContent
    .replace(/^#+.*$/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .substring(0, 150)
    .trim() + '...';
  const tags = theme === 'ia-tech'
    ? ['IA', 'technologie', 'productivité']
    : ['business', 'entrepreneur', 'revenus'];

  const frontmatter = `---
title: "${title.replace(/"/g, "'")}"
date: "${date}"
slug: "${slug}"
description: "${description.replace(/"/g, "'")}"
theme: "${theme}"
tags: ${JSON.stringify(tags)}
wordCount: ${wordCount}
---

${cleanContent}`;

  return {
    filename: `${date}-${slug}.md`,
    frontmatter,
    title,
    wordCount
  };
}

// Save article to file
function saveArticle(theme, content) {
  const themeDir = join(rootDir, 'content', theme);
  
  if (!existsSync(themeDir)) {
    mkdirSync(themeDir, { recursive: true });
  }

  const filepath = join(themeDir, content.filename);
  writeFileSync(filepath, content.frontmatter, 'utf8');
  
  return filepath;
}

// Main function
async function main() {
  log('🚀 Début de la génération des articles\n');
  log('='.repeat(50));

  try {
    // Generate ia-tech article
    console.log('📝 Étape 1: generateArticle...')
    const iaTech = await generateArticle('ia-tech');
    console.log('📝 Étape 2: formatArticle...')
    const iaTechFormatted = formatArticle(iaTech.content, 'ia-tech');
    console.log('📝 Étape 3: saveArticle...')
    console.log('📝 Title:', iaTechFormatted.title)
    console.log('📝 Filename:', iaTechFormatted.filename)
    const iaTechPath = saveArticle('ia-tech', iaTechFormatted);
    console.log('📝 Étape 4: sauvegarde OK')
    log(`\n✅ Article 1 généré : ${iaTechFormatted.title} (${iaTechFormatted.wordCount} mots) - ${iaTech.usedApi}`);
    log(`   📁 ${iaTechPath}`);

    // Generate business-en-ligne article
    const business = await generateArticle('business-en-ligne');
    const businessFormatted = formatArticle(business.content, 'business-en-ligne');
    const businessPath = saveArticle('business-en-ligne', businessFormatted);
    log(`\n✅ Article 2 généré : ${businessFormatted.title} (${businessFormatted.wordCount} mots) - ${business.usedApi}`);
    log(`   📁 ${businessPath}`);

    log('\n' + '='.repeat(50));
    log('🎉 Génération terminée avec succès !');
    
  } catch (error) {
    log('\n❌ Échec de la génération:');
    console.error('ERREUR COMPLÈTE:', error)
    logError('Génération articles', error);
    process.exit(1);
  }
}

// Run if called directly
main();

export { generateArticle, formatArticle, saveArticle };
