import React, { useState, useCallback, useMemo, useEffect } from "react";
import { 
  User, 
  Users, 
  Shield,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Flag,
  FileText,
  MessageSquare,
  Palette
} from "lucide-react";

const gangapplication = () => {
  const [formData, setFormData] = useState({
    gangName: '',
    gangColor: '',
    bossName: '',
    coLeaders: '',
    numberOfMembers: '',
    gangTag: '',
    backstory: '',
    mainOperations: '',
    territory: '',
    rpContribution: '',
    conflictHandling: '',
    rulesUnderstood: '',
    discordSteamDetails: '',
    gangOutfit: '',
    vehicles: '',
    additionalInfo: '',
    readGuidelines: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    gangInfo: true,
    background: false,
    roleplay: false,
    additional: false,
    agreement: false
  });

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const completionPercentage = useMemo(() => {
    const requiredFields = [
      'gangName', 'gangColor', 'bossName', 'numberOfMembers', 'gangTag',
      'backstory', 'mainOperations', 'rpContribution', 'conflictHandling',
      'rulesUnderstood', 'discordSteamDetails'
    ];
    
    const filledFields = requiredFields.filter(field => 
      formData[field] && formData[field].toString().trim() !== ''
    ).length;
    
    const guidelinesRead = formData.readGuidelines ? 1 : 0;
    const totalFields = requiredFields.length + 1;
    
    return Math.round(((filledFields + guidelinesRead) / totalFields) * 100);
  }, [formData]);

  const backstoryWordCount = useMemo(() => {
    return (formData.backstory || '').split(' ').filter(word => word.trim().length > 0).length;
  }, [formData.backstory]);

  const handleSubmit = useCallback(async () => {
    if (completionPercentage !== 100) {
      setSubmitStatus('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('Submitting application...');

    try {
      const webhookUrl = 'https://discord.com/api/webhooks/1428509853634269219/vwMufCbZV9nQe4vZq4rZ3y4b2PUsMzsWfPeKLshYdIfgHZVXtNH5oaqhb1R3tkfcBRGK';
      
      const embed = {
        title: `🏴 New Gang Application - SriLife RP`,
        color: 0x9333ea,
        timestamp: new Date().toISOString(),
        fields: [
          {
            name: "🏴 Gang Information",
            value: `**Gang Name:** ${formData.gangName}\n**Gang Color/Theme:** ${formData.gangColor}\n**Boss Name:** ${formData.bossName}\n**Co-Leader(s):** ${formData.coLeaders || 'None specified'}\n**Number of Members:** ${formData.numberOfMembers}\n**Gang Tag:** ${formData.gangTag}`,
            inline: false
          },
          {
            name: "📖 Background & Storyline",
            value: `**Backstory:** ${formData.backstory.substring(0, 300)}${formData.backstory.length > 300 ? '...' : ''}\n**Main Operations:** ${formData.mainOperations.substring(0, 200)}${formData.mainOperations.length > 200 ? '...' : ''}\n**Territory/Base:** ${formData.territory || 'Not specified'}`,
            inline: false
          },
          {
            name: "🎭 Roleplay & Conduct",
            value: `**RP Contribution:** ${formData.rpContribution.substring(0, 200)}${formData.rpContribution.length > 200 ? '...' : ''}\n**Conflict Handling:** ${formData.conflictHandling.substring(0, 200)}${formData.conflictHandling.length > 200 ? '...' : ''}\n**Rules Understood:** ${formData.rulesUnderstood}`,
            inline: false
          },
          {
            name: "ℹ️ Additional Information",
            value: `**Discord/Steam Details:** ${formData.discordSteamDetails.substring(0, 200)}${formData.discordSteamDetails.length > 200 ? '...' : ''}\n**Gang Outfit:** ${formData.gangOutfit || 'Not specified'}\n**Vehicles:** ${formData.vehicles || 'Not specified'}\n**Additional Notes:** ${formData.additionalInfo ? formData.additionalInfo.substring(0, 100) : 'None'}${formData.additionalInfo && formData.additionalInfo.length > 100 ? '...' : ''}`,
            inline: false
          },
          {
            name: "✅ Agreement",
            value: `**Read Guidelines:** ${formData.readGuidelines ? 'Yes' : 'No'}`,
            inline: false
          }
        ],
        footer: {
          text: `SriLife RP - Gang Application System`,
          icon_url: "https://res.cloudinary.com/dzummwk1a/image/upload/v1758656688/SriLife_RP_Logo_Transparent_dlk1hy.png"
        }
      };

      const payload = {
        embeds: [embed]
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitStatus('Gang application submitted successfully! Check your Discord for updates.');
        
        setFormData({
          gangName: '',
          gangColor: '',
          bossName: '',
          coLeaders: '',
          numberOfMembers: '',
          gangTag: '',
          backstory: '',
          mainOperations: '',
          territory: '',
          rpContribution: '',
          conflictHandling: '',
          rulesUnderstood: '',
          discordSteamDetails: '',
          gangOutfit: '',
          vehicles: '',
          additionalInfo: '',
          readGuidelines: false
        });
        
        setExpandedSections({
          gangInfo: true,
          background: false,
          roleplay: false,
          additional: false,
          agreement: false
        });
      } else {
        throw new Error(`Discord webhook failed: ${response.status}`);
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, completionPercentage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-800 to-gray-950 text-white">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden">
          <img 
            src="https://r2.fivemanage.com/sKmCaper4V0L7Y1FjfMDf/googleiii.png" 
            alt="SriLife RP Header"
            className="w-full h-auto"
          />
          
          <div className="p-4 bg-purple-50 border-b">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Application Progress</span>
              <span className="text-sm font-semibold text-purple-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {completionPercentage === 100 ? '✅ All fields completed!' : `${5 - Math.floor(completionPercentage / 20)} sections remaining`}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          
          <SectionHeader 
            title="Gang Information" 
            subtitle="Basic details about your gang"
            section="gangInfo" 
            icon={Flag}
            sectionNumber={1}
            isExpanded={expandedSections.gangInfo}
            onToggle={toggleSection}
          />
          
          {expandedSections.gangInfo && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <FormField label="Gang Name" required>
                <TextInput
                  placeholder="Los Santos Vipers"
                  value={formData.gangName}
                  onChange={handleInputChange}
                  field="gangName"
                />
              </FormField>

              <FormField label="Gang Color / Theme" required>
                <TextInput
                  placeholder="Purple and Black"
                  value={formData.gangColor}
                  onChange={handleInputChange}
                  field="gangColor"
                />
              </FormField>

              <FormField label="Boss Name (In-Game Name)" required>
                <TextInput
                  placeholder="Tony Rodriguez"
                  value={formData.bossName}
                  onChange={handleInputChange}
                  field="bossName"
                />
              </FormField>

              <FormField label="Co-Leader(s)">
                <TextInput
                  placeholder="Maria Santos, Jake Miller"
                  value={formData.coLeaders}
                  onChange={handleInputChange}
                  field="coLeaders"
                />
              </FormField>

              <FormField label="Number of Members" required>
                <TextInput
                  type="number"
                  placeholder="15"
                  value={formData.numberOfMembers}
                  onChange={handleInputChange}
                  field="numberOfMembers"
                  min="1"
                />
              </FormField>

              <FormField label="Gang Tag / Short Name" required>
                <TextInput
                  placeholder="LSV"
                  value={formData.gangTag}
                  onChange={handleInputChange}
                  field="gangTag"
                />
              </FormField>
            </div>
          )}

          <SectionHeader 
            title="Background & Storyline" 
            subtitle="Tell us about your gang's history and purpose"
            section="background" 
            icon={FileText}
            sectionNumber={2}
            isExpanded={expandedSections.background}
            onToggle={toggleSection}
          />
          
          {expandedSections.background && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <FormField 
                label="Brief Backstory of Your Gang" 
                required
                helperText={`Include origin, purpose, and roleplay style. Word count: ${backstoryWordCount}`}
              >
                <TextArea
                  rows={6}
                  placeholder="Describe your gang's origin story, how it was formed, its purpose, and the roleplay style your gang will bring to the server..."
                  value={formData.backstory}
                  onChange={handleInputChange}
                  field="backstory"
                />
              </FormField>

              <FormField 
                label="Main Operations" 
                required
                helperText="e.g., drug trafficking, robberies, car theft, etc."
              >
                <TextArea
                  rows={4}
                  placeholder="Describe the main criminal activities and operations your gang will engage in..."
                  value={formData.mainOperations}
                  onChange={handleInputChange}
                  field="mainOperations"
                />
              </FormField>

              <FormField label="Gang Territory or Base (If Any)">
                <TextInput
                  placeholder="Grove Street, Sandy Shores, etc."
                  value={formData.territory}
                  onChange={handleInputChange}
                  field="territory"
                />
              </FormField>
            </div>
          )}

          <SectionHeader 
            title="Roleplay & Conduct" 
            subtitle="How your gang will interact with the server"
            section="roleplay" 
            icon={MessageSquare}
            sectionNumber={3}
            isExpanded={expandedSections.roleplay}
            onToggle={toggleSection}
          />
          
          {expandedSections.roleplay && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <FormField label="How will your gang contribute to RP on the server?" required>
                <TextArea
                  rows={4}
                  placeholder="Explain how your gang will enhance roleplay experiences for others on the server..."
                  value={formData.rpContribution}
                  onChange={handleInputChange}
                  field="rpContribution"
                />
              </FormField>

              <FormField label="How will you handle conflicts with other gangs?" required>
                <TextArea
                  rows={4}
                  placeholder="Describe your approach to gang conflicts, territory disputes, and maintaining good roleplay..."
                  value={formData.conflictHandling}
                  onChange={handleInputChange}
                  field="conflictHandling"
                />
              </FormField>

              <FormField label="Do all members understand and follow server rules?" required>
                <Select
                  value={formData.rulesUnderstood}
                  onChange={handleInputChange}
                  field="rulesUnderstood"
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes, all members understand and will follow server rules</option>
                  <option value="No">No, some members need to review the rules</option>
                </Select>
              </FormField>
            </div>
          )}

          <SectionHeader 
            title="Additional Information" 
            subtitle="Extra details about your gang"
            section="additional" 
            icon={Users}
            sectionNumber={4}
            isExpanded={expandedSections.additional}
            onToggle={toggleSection}
          />
          
          {expandedSections.additional && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <FormField 
                label="Discord / Steam ID of Boss and Members" 
                required
                helperText="Provide Discord usernames and Steam IDs for verification"
              >
                <TextArea
                  rows={5}
                  placeholder="Boss: Discord#1234 (steam:110000xxxxxxxxx)&#10;Member 1: Discord#5678 (steam:110000xxxxxxxxx)&#10;Member 2: Discord#9012 (steam:110000xxxxxxxxx)"
                  value={formData.discordSteamDetails}
                  onChange={handleInputChange}
                  field="discordSteamDetails"
                />
              </FormField>

              <FormField label="Gang Outfit or Uniform Description">
                <TextArea
                  rows={3}
                  placeholder="Describe your gang's signature clothing, colors, and style..."
                  value={formData.gangOutfit}
                  onChange={handleInputChange}
                  field="gangOutfit"
                />
              </FormField>

              <FormField label="Vehicles Associated with the Gang (if any)">
                <TextInput
                  placeholder="Purple lowriders, black SUVs, motorcycles, etc."
                  value={formData.vehicles}
                  onChange={handleInputChange}
                  field="vehicles"
                />
              </FormField>

              <FormField label="Anything else you'd like to add">
                <TextArea
                  rows={3}
                  placeholder="Any additional information about your gang..."
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  field="additionalInfo"
                />
              </FormField>
            </div>
          )}

          <SectionHeader 
            title="Agreement & Confirmation" 
            subtitle="Confirm you've read the guidelines"
            section="agreement" 
            icon={Shield}
            sectionNumber={5}
            isExpanded={expandedSections.agreement}
            onToggle={toggleSection}
          />
          
          {expandedSections.agreement && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="mb-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 mt-1 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    checked={formData.readGuidelines}
                    onChange={(e) => handleInputChange('readGuidelines', e.target.checked)}
                  />
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      I have read SriLife RP Guidelines <span className="text-red-500">*</span>
                    </div>
                    <div className="text-gray-600">
                      I confirm that I and all gang members have read and understand the SriLife RP roleplay guidelines, gang rules, and will respect all server regulations.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.includes('successfully') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : submitStatus.includes('Failed') || submitStatus.includes('Please')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-purple-50 text-purple-700 border border-purple-200'
              }`}>
                <div className="flex items-center justify-center space-x-2">
                  {submitStatus.includes('successfully') ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : submitStatus.includes('Failed') || submitStatus.includes('Please') ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span className="font-medium">{submitStatus}</span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Submit Gang Application
              </h3>
              <p className="text-gray-600">
                {completionPercentage === 100 ? '✅ Ready to submit!' : `Complete ${5 - Math.floor(completionPercentage / 20)} more sections`}
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || completionPercentage !== 100}
              className={`px-8 py-4 font-semibold text-lg rounded-lg transition-all duration-200 ${
                completionPercentage === 100 && !isSubmitting
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting Application...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Submit Gang Application</span>
                </div>
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Your gang application will be reviewed by our administration team. You will receive a response via Discord within 24-48 hours.
            </p>
          </div>

          <div className="text-center pt-6 pb-4">
            <p className="text-sm text-gray-500">
              © 2024 SRILIFE ROLEPLAY - GANG APPLICATION SYSTEM v1.0
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Gang Recruitment & Management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = React.memo(({ title, subtitle, section, icon: Icon, sectionNumber, isExpanded, onToggle }) => (
  <div 
    className={`bg-white border-l-4 border-purple-500 shadow-sm rounded-lg overflow-hidden transition-all duration-200 ${
      isExpanded ? 'shadow-md' : 'hover:shadow-md'
    }`}
  >
    <div 
      className="p-5 cursor-pointer flex items-center justify-between transition-colors hover:bg-gray-50"
      onClick={() => onToggle(section)}
    >
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-2.5">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full font-medium">
          Section {sectionNumber}
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

const FormField = React.memo(({ label, required = false, children, helperText }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {helperText && (
      <p className="text-xs text-gray-500 mt-1.5">{helperText}</p>
    )}
  </div>
));

const TextInput = React.memo(({ placeholder, value, onChange, type = "text", field, ...props }) => (
  <input
    type={type}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all bg-white text-gray-900"
    value={value || ''}
    onChange={(e) => onChange(field, e.target.value)}
    placeholder={placeholder}
    {...props}
  />
));

const TextArea = React.memo(({ placeholder, value, onChange, rows = 4, field, ...props }) => (
  <textarea
    rows={rows}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all bg-white resize-none text-gray-900"
    value={value || ''}
    onChange={(e) => onChange(field, e.target.value)}
    placeholder={placeholder}
    {...props}
  />
));

const Select = React.memo(({ value, onChange, children, field, ...props }) => (
  <select
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all bg-white text-gray-900"
    value={value || ''}
    onChange={(e) => onChange(field, e.target.value)}
    {...props}
  >
    {children}
  </select>
));

export default gangapplication;