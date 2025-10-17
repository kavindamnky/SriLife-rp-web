import React, { useState, useCallback, useMemo, useEffect } from "react";
import { 
  User, 
  MessageSquare, 
  Shield,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Briefcase
} from "lucide-react";

const JobApplication = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    discordTag: '',
    ageIRL: '',
    timeZone: '',
    policeExperienceBefore: '',
    policePreviousRole: '',
    whyJoinPolice: '',
    policeSkillsQualities: '',
    highSpeedChase: '',
    gangRefuseCooperate: '',
    officerBreaksRules: '',
    preferredDivision: '',
    availability: '',
    policeAdditional: '',
    medicExperienceBefore: '',
    medicPastRole: '',
    whyJoinMedical: '',
    importantMedicQuality: '',
    majorAccidentScene: '',
    refuseTreatment: '',
    aggressivePatient: '',
    preferredMedicRole: '',
    medicAvailability: '',
    medicAdditional: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    jobSelection: true,
    personal: false,
    jobSpecific: false
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

  const handleJobSelection = useCallback((job) => {
    setSelectedJob(job);
    setExpandedSections(prev => ({
      ...prev,
      jobSelection: false,
      personal: true
    }));
  }, []);

  const completionPercentage = useMemo(() => {
    if (!selectedJob) return 0;

    const baseRequiredFields = ['fullName', 'discordTag', 'ageIRL'];

    const jobSpecificFields = selectedJob === 'Police' 
      ? ['policeExperienceBefore', 'whyJoinPolice', 'policeSkillsQualities', 
         'highSpeedChase', 'gangRefuseCooperate', 'officerBreaksRules']
      : ['medicExperienceBefore', 'whyJoinMedical', 'importantMedicQuality',
         'majorAccidentScene', 'refuseTreatment', 'aggressivePatient'];

    const requiredFields = [...baseRequiredFields, ...jobSpecificFields];
    
    const filledFields = requiredFields.filter(field => 
      formData[field] && formData[field].toString().trim() !== ''
    ).length;
    
    return Math.round((filledFields / requiredFields.length) * 100);
  }, [formData, selectedJob]);

  const handleSubmit = useCallback(async () => {
    if (!selectedJob) {
      setSubmitStatus('Please select a job position');
      return;
    }

    if (completionPercentage !== 100) {
      setSubmitStatus('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('Submitting application...');

    try {
      const webhookUrl = 'https://discord.com/api/webhooks/1428489599961006140/4cPuCSKDyEv1rAvn-6Xb5NnuDuC4-v-o1lJyY0XTZgG5Mcsc0uPYgFZ5O2XRM4IgmivV';
      
      const jobEmoji = selectedJob === 'Police' ? '👮' : '⚕️';
      const jobColor = selectedJob === 'Police' ? 0x1e40af : 0xdc2626;

      const baseFields = [
        {
          name: "🔹 Personal Information",
          value: `**Full Name (In-Game):** ${formData.fullName}\n**Discord Tag:** ${formData.discordTag}\n**Age (IRL):** ${formData.ageIRL}\n**Time Zone:** ${formData.timeZone || 'Not specified'}`,
          inline: false
        }
      ];

      const jobSpecificField = selectedJob === 'Police' ? {
        name: "👮 Police Application Details",
        value: `**Previous Experience:** ${formData.policeExperienceBefore}\n${formData.policeExperienceBefore.toLowerCase() === 'yes' && formData.policePreviousRole ? `**Previous Role:** ${formData.policePreviousRole.substring(0, 150)}...\n` : ''}**Why Join:** ${formData.whyJoinPolice.substring(0, 200)}...\n**Skills:** ${formData.policeSkillsQualities.substring(0, 200)}...\n**High-Speed Chase:** ${formData.highSpeedChase.substring(0, 150)}...\n**Gang Refusal:** ${formData.gangRefuseCooperate.substring(0, 150)}...\n**Officer Misconduct:** ${formData.officerBreaksRules.substring(0, 150)}...\n**Preferred Division:** ${formData.preferredDivision || 'Not specified'}\n**Availability:** ${formData.availability || 'Not specified'}`,
        inline: false
      } : {
        name: "⚕️ Medic Application Details",
        value: `**Previous Experience:** ${formData.medicExperienceBefore}\n${formData.medicExperienceBefore.toLowerCase() === 'yes' && formData.medicPastRole ? `**Past Role:** ${formData.medicPastRole.substring(0, 150)}...\n` : ''}**Why Join:** ${formData.whyJoinMedical.substring(0, 200)}...\n**Important Quality:** ${formData.importantMedicQuality.substring(0, 200)}...\n**Accident Response:** ${formData.majorAccidentScene.substring(0, 150)}...\n**Treatment Refusal:** ${formData.refuseTreatment.substring(0, 150)}...\n**Aggressive Patient:** ${formData.aggressivePatient.substring(0, 150)}...\n**Preferred Role:** ${formData.preferredMedicRole || 'Not specified'}\n**Availability:** ${formData.medicAvailability || 'Not specified'}`,
        inline: false
      };

      const embed = {
        title: `${jobEmoji} New ${selectedJob} Application - SriLife RP`,
        color: jobColor,
        timestamp: new Date().toISOString(),
        fields: [...baseFields, jobSpecificField],
        footer: {
          text: `SriLife RP - ${selectedJob} Application System`,
          icon_url: "https://res.cloudinary.com/dzummwk1a/image/upload/v1758656688/SriLife_RP_Logo_Transparent_dlk1hy.png"
        }
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });

      if (response.ok) {
        setSubmitStatus('Application submitted successfully! Check your Discord for updates.');
        setFormData({
          fullName: '', discordTag: '', ageIRL: '', timeZone: '',
          policeExperienceBefore: '', policePreviousRole: '', whyJoinPolice: '',
          policeSkillsQualities: '', highSpeedChase: '', gangRefuseCooperate: '',
          officerBreaksRules: '', preferredDivision: '', availability: '', policeAdditional: '',
          medicExperienceBefore: '', medicPastRole: '', whyJoinMedical: '',
          importantMedicQuality: '', majorAccidentScene: '', refuseTreatment: '',
          aggressivePatient: '', preferredMedicRole: '', medicAvailability: '', medicAdditional: ''
        });
        setSelectedJob('');
        setExpandedSections({ jobSelection: true, personal: false, jobSpecific: false });
      } else {
        throw new Error(`Discord webhook failed: ${response.status}`);
      }
    } catch (error) {
      setSubmitStatus('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, completionPercentage, selectedJob]);

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-800 to-gray-950 text-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden">
          <img src="https://r2.fivemanage.com/sKmCaper4V0L7Y1FjfMDf/googleii.png" alt="SriLife RP Header" className="w-full h-auto"/>
          {selectedJob && (
            <div className="p-4 bg-blue-50 border-b">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Application Progress</span>
                <span className="text-sm font-semibold text-blue-600">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }}/>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {completionPercentage === 100 ? '✅ All fields completed!' : `${3 - Math.floor(completionPercentage / 34)} sections remaining`}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <SectionHeader title="Select Job Position" subtitle="Choose the position you want to apply for" section="jobSelection" icon={Briefcase} sectionNumber={1} isExpanded={expandedSections.jobSelection} onToggle={toggleSection}/>
          
          {expandedSections.jobSelection && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={() => handleJobSelection('Police')} className={`p-6 rounded-lg border-2 transition-all duration-200 ${selectedJob === 'Police' ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-400 hover:shadow-sm'}`}>
                  <div className="text-center">
                    <div className="text-5xl mb-3">👮</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Police Officer</h3>
                    <p className="text-sm text-gray-600">Maintain law and order in the city</p>
                    {selectedJob === 'Police' && <div className="mt-3 text-blue-600 font-medium text-sm">✓ Selected</div>}
                  </div>
                </button>
                <button onClick={() => handleJobSelection('Medic')} className={`p-6 rounded-lg border-2 transition-all duration-200 ${selectedJob === 'Medic' ? 'border-red-600 bg-red-50 shadow-md' : 'border-gray-200 hover:border-red-400 hover:shadow-sm'}`}>
                  <div className="text-center">
                    <div className="text-5xl mb-3">⚕️</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Medic/EMS</h3>
                    <p className="text-sm text-gray-600">Save lives and provide medical care</p>
                    {selectedJob === 'Medic' && <div className="mt-3 text-red-600 font-medium text-sm">✓ Selected</div>}
                  </div>
                </button>
              </div>
              {selectedJob && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-green-700 font-medium">{selectedJob === 'Police' ? '👮' : '⚕️'} You selected: <strong>{selectedJob}</strong></p>
                  <p className="text-sm text-green-600 mt-1">Continue filling out the application below</p>
                </div>
              )}
            </div>
          )}

          {selectedJob && (
            <>
              <SectionHeader title="Personal Information" subtitle="Your basic details" section="personal" icon={User} sectionNumber={2} isExpanded={expandedSections.personal} onToggle={toggleSection}/>
              {expandedSections.personal && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <FormField label="Full Name (In-Game)" required>
                    <TextInput placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} field="fullName"/>
                  </FormField>
                  <FormField label="Discord Tag" required>
                    <TextInput placeholder="username#1234" value={formData.discordTag} onChange={handleInputChange} field="discordTag"/>
                  </FormField>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Age (IRL)" required>
                      <TextInput type="number" placeholder="18" value={formData.ageIRL} onChange={handleInputChange} field="ageIRL" min="18"/>
                    </FormField>
                    <FormField label="Time Zone">
                      <TextInput placeholder="EST, PST, GMT, etc." value={formData.timeZone} onChange={handleInputChange} field="timeZone"/>
                    </FormField>
                  </div>
                </div>
              )}

              <SectionHeader title={selectedJob === 'Police' ? '🚔 Police Application Questions' : '🚑 Medic Application Questions'} subtitle={`Experience & scenario questions for ${selectedJob} role`} section="jobSpecific" icon={selectedJob === 'Police' ? Shield : MessageSquare} sectionNumber={3} isExpanded={expandedSections.jobSpecific} onToggle={toggleSection}/>
              {expandedSections.jobSpecific && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  {selectedJob === 'Police' ? (
                    <>
                      <FormField label="Have you served in law enforcement on any RP server before?" required>
                        <Select value={formData.policeExperienceBefore} onChange={handleInputChange} field="policeExperienceBefore">
                          <option value="">Choose</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Select>
                      </FormField>
                      {formData.policeExperienceBefore === 'Yes' && (
                        <FormField label="If Yes, describe your previous role:">
                          <TextArea rows={3} placeholder="Describe your previous law enforcement experience..." value={formData.policePreviousRole} onChange={handleInputChange} field="policePreviousRole"/>
                        </FormField>
                      )}
                      <FormField label="Why do you want to join the Police Department?" required>
                        <TextArea rows={4} placeholder="Explain your motivation..." value={formData.whyJoinPolice} onChange={handleInputChange} field="whyJoinPolice"/>
                      </FormField>
                      <FormField label="What skills or qualities make you a good officer?" required>
                        <TextArea rows={4} placeholder="Describe your skills..." value={formData.policeSkillsQualities} onChange={handleInputChange} field="policeSkillsQualities"/>
                      </FormField>
                      <FormField label="How would you handle a high-speed chase?" required>
                        <TextArea rows={4} placeholder="Describe your approach..." value={formData.highSpeedChase} onChange={handleInputChange} field="highSpeedChase"/>
                      </FormField>
                      <FormField label="What would you do if a gang refuses to cooperate?" required>
                        <TextArea rows={4} placeholder="Explain your response..." value={formData.gangRefuseCooperate} onChange={handleInputChange} field="gangRefuseCooperate"/>
                      </FormField>
                      <FormField label="How would you react if another officer breaks rules?" required>
                        <TextArea rows={4} placeholder="Describe how you'd handle it..." value={formData.officerBreaksRules} onChange={handleInputChange} field="officerBreaksRules"/>
                      </FormField>
                      <FormField label="Preferred Role / Division (e.g., Patrol, SWAT, Traffic):">
                        <TextInput placeholder="Patrol, SWAT, Traffic, etc." value={formData.preferredDivision} onChange={handleInputChange} field="preferredDivision"/>
                      </FormField>
                      <FormField label="Availability (Days & Hours):">
                        <TextArea rows={2} placeholder="e.g., Mon-Fri 6PM-10PM EST" value={formData.availability} onChange={handleInputChange} field="availability"/>
                      </FormField>
                      <FormField label="Anything else you'd like to add:">
                        <TextArea rows={3} placeholder="Additional information..." value={formData.policeAdditional} onChange={handleInputChange} field="policeAdditional"/>
                      </FormField>
                    </>
                  ) : (
                    <>
                      <FormField label="Have you been a medic or EMS on any RP server before?" required>
                        <Select value={formData.medicExperienceBefore} onChange={handleInputChange} field="medicExperienceBefore">
                          <option value="">Choose</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Select>
                      </FormField>
                      {formData.medicExperienceBefore === 'Yes' && (
                        <FormField label="If Yes, explain your past role and experience:">
                          <TextArea rows={3} placeholder="Describe your previous experience..." value={formData.medicPastRole} onChange={handleInputChange} field="medicPastRole"/>
                        </FormField>
                      )}
                      <FormField label="Why do you want to join the Medical Department?" required>
                        <TextArea rows={4} placeholder="Explain your motivation..." value={formData.whyJoinMedical} onChange={handleInputChange} field="whyJoinMedical"/>
                      </FormField>
                      <FormField label="What do you think is the most important quality for a medic?" required>
                        <TextArea rows={4} placeholder="Describe the quality..." value={formData.importantMedicQuality} onChange={handleInputChange} field="importantMedicQuality"/>
                      </FormField>
                      <FormField label="How would you respond to a major accident scene?" required>
                        <TextArea rows={4} placeholder="Describe your response..." value={formData.majorAccidentScene} onChange={handleInputChange} field="majorAccidentScene"/>
                      </FormField>
                      <FormField label="What would you do if someone refuses treatment?" required>
                        <TextArea rows={4} placeholder="Explain your approach..." value={formData.refuseTreatment} onChange={handleInputChange} field="refuseTreatment"/>
                      </FormField>
                      <FormField label="How would you handle a situation where a patient becomes aggressive?" required>
                        <TextArea rows={4} placeholder="Describe your response..." value={formData.aggressivePatient} onChange={handleInputChange} field="aggressivePatient"/>
                      </FormField>
                      <FormField label="Preferred Role (EMS / Doctor / Rescue Team):">
                        <TextInput placeholder="EMS, Doctor, Rescue Team, etc." value={formData.preferredMedicRole} onChange={handleInputChange} field="preferredMedicRole"/>
                      </FormField>
                      <FormField label="Availability (Days & Hours):">
                        <TextArea rows={2} placeholder="e.g., Mon-Fri 6PM-10PM EST" value={formData.medicAvailability} onChange={handleInputChange} field="medicAvailability"/>
                      </FormField>
                      <FormField label="Extra Notes or Comments:">
                        <TextArea rows={3} placeholder="Additional information..." value={formData.medicAdditional} onChange={handleInputChange} field="medicAdditional"/>
                      </FormField>
                    </>
                  )}
                </div>
              )}

              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                {submitStatus && (
                  <div className={`mb-6 p-4 rounded-lg ${submitStatus.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : submitStatus.includes('Failed') || submitStatus.includes('Please') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                    <div className="flex items-center justify-center space-x-2">
                      {submitStatus.includes('successfully') ? <CheckCircle2 className="w-5 h-5"/> : submitStatus.includes('Failed') || submitStatus.includes('Please') ? <AlertCircle className="w-5 h-5"/> : <Send className="w-5 h-5"/>}
                      <span className="font-medium">{submitStatus}</span>
                    </div>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Submit {selectedJob} Application</h3>
                  <p className="text-gray-600">{completionPercentage === 100 ? '✅ Ready to submit!' : `Complete all required fields`}</p>
                </div>
                <button onClick={handleSubmit} disabled={isSubmitting || completionPercentage !== 100} className={`px-8 py-4 font-semibold text-lg rounded-lg transition-all duration-200 ${completionPercentage === 100 && !isSubmitting ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-5 h-5"/>
                      <span>Submit {selectedJob} Application</span>
                    </div>
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-4">Your application will be reviewed within 24-48 hours.</p>
              </div>
            </>
          )}

          {!selectedJob && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <AlertCircle className="w-16 h-16 text-blue-500 mx-auto mb-4"/>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Job Position to Continue</h3>
              <p className="text-gray-600">Please select either Police or Medic position above to start your application.</p>
            </div>
          )}

          <div className="text-center pt-6 pb-4">
            <p className="text-sm text-gray-500">© 2024 SRILIFE ROLEPLAY - JOB APPLICATION SYSTEM v4.0</p>
            <p className="text-xs text-gray-400 mt-1">Police & Medic Recruitment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, section, icon: Icon, sectionNumber, isExpanded, onToggle }) => (
  <div className={`bg-white border-l-4 border-blue-500 shadow-sm rounded-lg overflow-hidden transition-all duration-200 ${isExpanded ? 'shadow-md' : 'hover:shadow-md'}`}>
    <div className="p-5 cursor-pointer flex items-center justify-between transition-colors hover:bg-gray-50" onClick={() => onToggle(section)}>
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full p-2.5">
          <Icon className="w-5 h-5"/>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">Section {sectionNumber}</span>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400"/> : <ChevronDown className="w-5 h-5 text-gray-400"/>}
      </div>
    </div>
  </div>
);

const FormField = ({ label, required = false, children }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const TextInput = ({ placeholder, value, onChange, type = "text", field, ...props }) => (
  <input type={type} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white text-gray-900" value={value || ''} onChange={(e) => onChange(field, e.target.value)} placeholder={placeholder} {...props}/>
);

const TextArea = ({ placeholder, value, onChange, rows = 4, field, ...props }) => (
  <textarea rows={rows} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white resize-none text-gray-900" value={value || ''} onChange={(e) => onChange(field, e.target.value)} placeholder={placeholder} {...props}/>
);

const Select = ({ value, onChange, children, field, ...props }) => (
  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white text-gray-900" value={value || ''} onChange={(e) => onChange(field, e.target.value)} {...props}>
    {children}
  </select>
);

export default JobApplication;