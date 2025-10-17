import React, { useState, useCallback, useMemo, useEffect } from "react";
import { 
  User, 
  Mail, 
  MessageSquare, 
  Clock, 
  Users, 
  FileText, 
  Globe, 
  Video, 
  Mic, 
  Shield,
  Send,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const WLapplication = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    discordUsername: '',
    discordId: '',
    age: '',
    dateOfBirth: '',
    characterName: '',
    characterBackstory: '',
    characterGoal: '',
    characterStrengthsWeaknesses: '',
    steamProfileUrl: '',
    steamHexId: '',
    isStreamer: '',
    streamLink: '',
    workingMic: '',
    howDidYouKnow: '',
    readGuidelines: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    character: false,
    steam: false,
    streaming: false,
    agreement: false
  });

  // Memoized toggle function to prevent re-renders
  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // Memoized input change handler
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Memoized completion calculation
  const completionPercentage = useMemo(() => {
    const requiredFields = [
      'email', 'fullName', 'discordUsername', 'discordId', 'age', 'dateOfBirth',
      'characterName', 'characterBackstory', 'characterGoal', 'characterStrengthsWeaknesses',
      'steamProfileUrl', 'steamHexId', 'isStreamer', 'workingMic', 'howDidYouKnow'
    ];
    
    const filledFields = requiredFields.filter(field => 
      formData[field] && formData[field].toString().trim() !== ''
    ).length;
    
    const guidelinesRead = formData.readGuidelines ? 1 : 0;
    const totalFields = requiredFields.length + 1;
    
    return Math.round(((filledFields + guidelinesRead) / totalFields) * 100);
  }, [formData]);

  // Memoized word count
  const backstoryWordCount = useMemo(() => {
    return (formData.characterBackstory || '').split(' ').filter(word => word.trim().length > 0).length;
  }, [formData.characterBackstory]);

  const handleSubmit = useCallback(async () => {
    if (completionPercentage !== 100) {
      setSubmitStatus('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('Submitting application...');

    try {
      const webhookUrl = 'https://discord.com/api/webhooks/1420343265043021936/EMuLnRVnqxnB3yApDOIFJhGjf6qHuDpPBD_rAwHDr1007rTcH4PQouKZAkCOL1SmNKRV';
      
      const embed = {
        title: "🎭 New SriLife Roleplay Whitelist Application",
        color: 0x4285f4,
        timestamp: new Date().toISOString(),
        fields: [
          {
            name: "👤 Personal Information",
            value: `**Email:** ${formData.email}\n**Name:** ${formData.fullName}\n**Discord:** ${formData.discordUsername}\n**Discord ID:** ${formData.discordId}\n**Age:** ${formData.age}\n**DOB:** ${formData.dateOfBirth}`,
            inline: false
          },
          {
            name: "🎬 Character Information",
            value: `**Character Name:** ${formData.characterName}\n**Backstory:** ${formData.characterBackstory.substring(0, 200)}${formData.characterBackstory.length > 200 ? '...' : ''}\n**Main Goal:** ${formData.characterGoal.substring(0, 200)}${formData.characterGoal.length > 200 ? '...' : ''}\n**Strengths/Weaknesses:** ${formData.characterStrengthsWeaknesses.substring(0, 200)}${formData.characterStrengthsWeaknesses.length > 200 ? '...' : ''}`,
            inline: false
          },
          {
            name: "🎮 Steam Information",
            value: `**Steam Profile:** ${formData.steamProfileUrl}\n**Steam Hex ID:** ${formData.steamHexId}`,
            inline: true
          },
          {
            name: "📺 Streaming Info",
            value: `**Is Streamer:** ${formData.isStreamer}\n**Stream Link:** ${formData.streamLink || 'Not provided'}`,
            inline: true
          },
          {
            name: "✅ Agreement & Misc",
            value: `**Working Mic:** ${formData.workingMic}\n**How did you know us:** ${formData.howDidYouKnow.substring(0, 100)}${formData.howDidYouKnow.length > 100 ? '...' : ''}\n**Read Guidelines:** ${formData.readGuidelines ? 'Yes' : 'No'}`,
            inline: false
          }
        ],
        footer: {
          text: "SriLife Roleplay Whitelist System",
          icon_url: "https://res.cloudinary.com/dzummwk1a/image/upload/v1758656688/SriLife_RP_Logo_Transparent_dlk1hy.png"
        }
      };

      const payload = {
        embeds: [embed]
      };

      // Send to Discord Webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitStatus('Application submitted successfully! Check your Discord for updates.');
        console.log('Application submitted to Discord successfully');
        
        // Reset form after successful submission
        setFormData({
          email: '', fullName: '', discordUsername: '', discordId: '', age: '', dateOfBirth: '',
          characterName: '', characterBackstory: '', characterGoal: '', characterStrengthsWeaknesses: '',
          steamProfileUrl: '', steamHexId: '', isStreamer: '', streamLink: '',
          workingMic: '', howDidYouKnow: '', readGuidelines: false
        });
        
        // Reset all sections to collapsed except personal
        setExpandedSections({
          personal: true,
          character: false,
          steam: false,
          streaming: false,
          agreement: false
        });
      } else {
        const errorText = await response.text();
        console.error('Discord webhook error:', response.status, errorText);
        throw new Error(`Discord webhook failed: ${response.status}`);
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, completionPercentage]);

  // Scroll to top when component mounts (when opened in new tab)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
        <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-950 to-gray-800 text-white">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden">
          <img 
            src="https://r2.fivemanage.com/sKmCaper4V0L7Y1FjfMDf/googlei.png" 
            alt="SriLife RP Header"
            className="w-full h-auto"
          />
          
          {/* Progress Indicator */}
          <div className="p-4 bg-blue-50 border-b">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-semibold text-blue-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {completionPercentage === 100 ? 'All fields completed!' : `${Math.ceil((100 - completionPercentage) / 6.25)} sections remaining`}
            </p>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-2">
          
          {/* Section 1: Personal Information */}
          <SectionHeader 
            title="Personal Information" 
            subtitle="Please fill with your real details"
            section="personal" 
            icon={User}
            sectionNumber={1}
            isExpanded={expandedSections.personal}
            onToggle={toggleSection}
            id="section-personal-info" 
          />
          
          {expandedSections.personal && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="What is Your Email Address?" required>
                  <TextInput
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    field="email"
                    id="input-email"
                  />
                </FormField>
                
                <FormField label="Your Full Name?" required>
                  <TextInput
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    field="fullName"
                    id="input-full-name"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="What's your Discord Username? (e.g., Discord#2024)" required>
                  <TextInput
                    placeholder="Discord#2024"
                    value={formData.discordUsername}
                    onChange={handleInputChange}
                    field="discordUsername"
                    id="input-discord-username"
                  />
                </FormField>
                
                <FormField 
                  label="What's your Discord ID? (e.g., 1083020219289841664)" 
                  required
                  helperText={
                    <span>
                      Unsure what this is? Visit{' '}
                      <a href="https://bit.ly/3hDVt5W" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        https://bit.ly/3hDVt5W
                      </a>
                    </span>
                  }
                >
                  <TextInput
                    placeholder="1083020219289841664"
                    value={formData.discordId}
                    onChange={handleInputChange}
                    field="discordId"
                    id="input-discord-id"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="How old are you?" required>
                  <TextInput
                    type="number"
                    placeholder="18"
                    value={formData.age}
                    onChange={handleInputChange}
                    field="age"
                    min="18"
                    id="input-age"
                  />
                </FormField>
                
                <FormField label="Date of Birth" required>
                  <TextInput
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    field="dateOfBirth"
                    id="input-date-of-birth"
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* Section 2: Character Info */}
          <SectionHeader 
            title="Character Info (*)" 
            subtitle="Now answer all the questions in character"
            section="character" 
            icon={Users}
            sectionNumber={2}
            isExpanded={expandedSections.character}
            onToggle={toggleSection}
            id="section-character-info" 
          />
          
          {expandedSections.character && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <FormField label="Character Name? (e.g., Ray Manchester)" required>
                <TextInput
                  placeholder="Ray Manchester"
                  value={formData.characterName}
                  onChange={handleInputChange}
                  field="characterName"
                  id="input-character-name"
                />
              </FormField>

              <FormField 
                label="Character Back Story (50 words or more)" 
                required
                helperText={`Current word count: ${backstoryWordCount}`}
              >
                <TextArea
                  rows={5}
                  placeholder="Write your character's detailed backstory (minimum 50 words)..."
                  value={formData.characterBackstory}
                  onChange={handleInputChange}
                  field="characterBackstory"
                  id="input-character-backstory"
                />
              </FormField>

              <FormField label="What's your character's main goal in the city, and how will you achieve it?" required>
                <TextArea
                  placeholder="Describe your character's main goals and how they plan to achieve them..."
                  value={formData.characterGoal}
                  onChange={handleInputChange}
                  field="characterGoal"
                  id="input-character-goal"
                />
              </FormField>

              <FormField label="What are your character's strengths and weaknesses?" required>
                <TextArea
                  placeholder="List your character's main strengths and weaknesses..."
                  value={formData.characterStrengthsWeaknesses}
                  onChange={handleInputChange}
                  field="characterStrengthsWeaknesses"
                  id="input-character-strengths-weaknesses"
                />
              </FormField>
            </div>
          )}

          {/* Section 3: Steam Info */}
          <SectionHeader 
            title="Steam Info" 
            subtitle="Fill your real Steam information"
            section="steam" 
            icon={Globe}
            sectionNumber={3}
            isExpanded={expandedSections.steam}
            onToggle={toggleSection}
            id="section-steam-info" 
          />
          
          {expandedSections.steam && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <FormField label="Steam Profile URL?" required>
                <TextInput
                  type="url"
                  placeholder="https://steamcommunity.com/id/yourprofile"
                  value={formData.steamProfileUrl}
                  onChange={handleInputChange}
                  field="steamProfileUrl"
                  id="input-steam-profile-url"
                />
              </FormField>

              <FormField 
                label="Steam Hex ID?" 
                required
                helperText={
                  <span>
                    Unsure what this is? Visit{' '}
                    <a href="https://steamid.pro/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      https://steamid.pro/
                    </a>
                  </span>
                }
              >
                <TextInput
                  placeholder="steam:110000xxxxxxxxx"
                  value={formData.steamHexId}
                  onChange={handleInputChange}
                  field="steamHexId"
                  id="input-steam-hex-id"
                />
              </FormField>
            </div>
          )}

          {/* Section 4: Streaming Info */}
          <SectionHeader 
            title="Streaming Info" 
            section="streaming" 
            icon={Video}
            sectionNumber={4}
            isExpanded={expandedSections.streaming}
            onToggle={toggleSection}
            id="section-streaming-info" 
          />
          
          {expandedSections.streaming && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <FormField label="Are you a Live streamer or not?" required>
                <Select
                  value={formData.isStreamer}
                  onChange={handleInputChange}
                  field="isStreamer"
                  id="select-is-streamer"
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes, I am a streamer</option>
                  <option value="No">No, I am not a streamer</option>
                </Select>
              </FormField>

              <FormField label="Stream Link (Optional)">
                <TextInput
                  type="url"
                  placeholder="https://twitch.tv/yourstream or https://youtube.com/yourchannel"
                  value={formData.streamLink}
                  onChange={handleInputChange}
                  field="streamLink"
                  id="input-stream-link"
                />
              </FormField>
            </div>
          )}

          {/* Section 5: Agreement */}
          <SectionHeader 
            title="Agreement" 
            section="agreement" 
            icon={Shield}
            sectionNumber={5}
            isExpanded={expandedSections.agreement}
            onToggle={toggleSection}
            id="section-agreement" 
          />
          
          {expandedSections.agreement && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <FormField label="Working mic?" required>
                <Select
                  value={formData.workingMic}
                  onChange={handleInputChange}
                  field="workingMic"
                  id="select-working-mic"
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes, I have a working microphone</option>
                  <option value="No">No, I don't have a working microphone</option>
                </Select>
              </FormField>

              <FormField label="How did you know about Us? (Answer shortly)" required>
                <TextArea
                  rows={3}
                  placeholder="Briefly explain how you discovered SriLife RP..."
                  value={formData.howDidYouKnow}
                  onChange={handleInputChange}
                  field="howDidYouKnow"
                  id="input-how-did-you-know"
                />
              </FormField>

              <div className="mb-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-1 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    checked={formData.readGuidelines}
                    onChange={(e) => handleInputChange('readGuidelines', e.target.checked)}
                    id="checkbox-read-guidelines"
                  />
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      Have you Read Sri Life RP Roleplay Guidelines? <span className="text-red-500">*</span>
                    </div>
                    <div className="text-gray-600">
                      I confirm that I have read and understand the SriLife RP roleplay guidelines and rules.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Submit Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center" id="section-submit">
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.includes('successfully') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : submitStatus.includes('Failed') || submitStatus.includes('Please fill')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                <div className="flex items-center justify-center space-x-2">
                  {submitStatus.includes('successfully') ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : submitStatus.includes('Failed') || submitStatus.includes('Please fill') ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span className="font-medium">{submitStatus}</span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Submit Application</h3>
              <p className="text-gray-600">
                {completionPercentage === 100 ? 'All required fields completed. Ready to submit!' : `Please complete ${Math.ceil((100 - completionPercentage) / 6.25)} more sections to submit.`}
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || completionPercentage !== 100}
              className={`px-8 py-3 font-medium text-base rounded-lg transition-all duration-200 ${
                completionPercentage === 100 && !isSubmitting
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              id="button-submit-application"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Application'
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Your application will be sent to our Discord server for review. You will receive a response within 24-48 hours.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center pt-6">
            <p className="text-sm text-gray-500">
              © 2024 SRILIFE ROLEPLAY - WHITELIST SYSTEM v3.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoized Section Header Component
const SectionHeader = React.memo(({ title, subtitle, section, icon: Icon, sectionNumber, isExpanded, onToggle, id }) => (
  <div 
    className={`bg-white border-l-4 border-blue-500 shadow-sm rounded-lg mb-6 overflow-hidden transition-all duration-200 ${
      isExpanded ? 'shadow-md' : 'hover:shadow-md'
    }`}
    id={id}
  >
    <div 
      className="p-4 cursor-pointer flex items-center justify-between transition-colors"
      onClick={() => onToggle(section)}
    >
      <div className="flex items-center space-x-3">
        <div className="bg-blue-500 text-white rounded-full p-2">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-800">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
          Section {sectionNumber} of 5
        </span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>
    </div>
  </div>
));

// Memoized Form Field Component
const FormField = React.memo(({ label, required = false, children, helperText, id }) => (
  <div className="mb-6" id={id}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {helperText && (
      <p className="text-xs text-gray-500 mt-1">{helperText}</p>
    )}
  </div>
));

// Memoized Text Input Component
const TextInput = React.memo(({ placeholder, value, onChange, type = "text", field, id, ...props }) => (
  <input
    type={type}
    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors bg-white text-gray-900"
    value={value || ''}
    onChange={(e) => onChange(field, e.target.value)}
    placeholder={placeholder}
    id={id || `input-${field}`}
    {...props}
  />
));

// Memoized Text Area Component
const TextArea = React.memo(({ placeholder, value, onChange, rows = 4, field, id, ...props }) => (
  <textarea
    rows={rows}
    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors bg-white resize-none text-gray-900"
    value={value || ''}
    onChange={(e) => onChange(field, e.target.value)}
    placeholder={placeholder}
    id={id || `textarea-${field}`}
    {...props}
  />
));

// Memoized Select Component
const Select = React.memo(({ value, onChange, children, field, id, ...props }) => (
  <select
    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors bg-white text-gray-900"
    value={value || ''}
    onChange={(e) => onChange(field, e.target.value)}
    id={id || `select-${field}`}
    {...props}
  >
    {children}
  </select>
));

export default WLapplication;