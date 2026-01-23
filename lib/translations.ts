export type Locale = 'en' | 'tr'

export type TranslationKey = string

export const translations = {
    en: {
        common: {
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            created: "Created",
            updated: "Updated",
            locale_code: "en",
            copy: "Copy",
            copied: "Copied to clipboard",
            loading: "Loading...",
            confirm_delete: "Are you sure you want to proceed?",
            delete_char_confirm: "Are you sure you want to delete",
            sort_newest: "Newest First",
            sort_oldest: "Oldest First",
            no_character: "No Character Selected",
            no_characters_found: "No characters found.",
            select_character: "Select a character to continue.",
            create_new_character: "Create New Character",
            my_characters: "My Characters",
            character: "Character",
        },
        nav: {
            dashboard: "Dashboard",
            profile: "Profile",
            diary: "Diary",
            timeline: "Timeline",
            settings: "Settings"
        },
        dashboard: {
            title: "Dashboard",
            welcome: "Welcome to RoleBase",
            select_to_begin: "Please select or create a character to begin.",
            customize: "Customize",
            done_editing: "Done Editing",
            editing_hint: "Drag widgets to reorder. Use the size controls on each widget to resize.",
            widgets: {
                id_card: "ID Card",
                last_entries: "Last Entries",
                quick_actions: "Quick Actions",
                notes: "Quick Notes",
                ai_chat: "AI Assistant"
            },
            id_card: {
                occupation: "Occupation",
                dob: "DOB",
                signature: "Signature",
                id_class: "ID Class",
                location: "San Andreas",
                unemployed: "Unemployed",
                unknown: "UNKNOWN"
            },
            quick_actions: {
                new_entry: "+ Entry",
                new_event: "+ Event",
                edit: "Edit"
            },
            quick_notes: {
                placeholder: "Type scratch notes here..."
            },
            last_entries: {
                no_entries: "No diary entries yet."
            },
            chat: {
                title: "AI Chat",
                clear: "Clear chat history?",
                start: "Start a conversation with",
                thinking: "Thinking...",
                placeholder: "Message...",
                send: "Send",
                error: "Error: Could not connect to AI mind."
            }
        },
        profile: {
            title: "Profile",
            edit_profile: "Edit Profile",
            save_changes: "Save Changes",
            id_info: "ID Information",
            contact_info: "Contact & Financial",
            background: "Background Story",
            abilities: "Abilities & Skills",
            traits: "Traits",
            fields: {
                name: "Full Legal Name",
                name_placeholder: "e.g. John Doe",
                dob: "Date of Birth",
                pob: "Place of Birth",
                job: "Occupation / Job",
                family: "Family / Next of Kin",
                address: "Residential Address",
                phone: "Phone Number",
                bank: "Bank Account Number",
                story_placeholder: "Write your character's backstory here...",
                no_story: "No backstory written yet."
            },
            traits_sections: {
                personality: "Personality",
                physical: "Physical"
            }
        },
        timeline: {
            title: "Timeline",
            subtitle: "Chronological history of",
            add_event: "Add Event",
            save_event: "Save Event",
            no_events: "No timeline events recorded yet.",
            dialog: {
                add_title: "Add Timeline Event",
                edit_title: "Edit Timeline Event",
                title_label: "Event Title",
                date_label: "Date",
                type_label: "Event Type",
                summary_label: "Summary"
            },
            types: {
                personal: "Personal",
                business: "Business",
                relationship: "Relationship",
                crime: "Crime"
            }
        },
        diary: {
            title: "Diary",
            new_entry: "New Entry",
            search: "Search entries...",
            no_entries: "No entries yet. Start writing!",
            save: "Save",
            generate: "Generate",
            title_placeholder: "Entry Title...",
            select_prompt: "Select an entry or create a new one.",
            generate_prompt: "Write a diary entry for today based on the recent events. Maintain the character's voice.",
            context_label: "Context"
        },
        settings: {
            title: "Settings",
            subtitle: "Configure your AI provider and application preferences.",
            ai_layer: "AI Intelligence Layer",
            api_key: "API Key",
            api_key_desc: "Stored locally in your browser. Never sent to our servers.",
            system_persona: "AI Persona",
            analyze_autofill: "Analyze & Auto-Fill",
            analyze_desc: "This persona is unique to",
            select_char_persona: "Select a character to customize persona",
            data_management: "Data Management",
            import: "Import Character",
            import_desc: "Upload a JSON file (e.g., character backup) to import it into the tracker.",
            export: "Export Character",
            export_desc: "Download your character data as a JSON file for backup or transfer.",
            click_upload: "Click to upload",
            drag_drop: "or drag and drop",
            language: "Language",
            language_desc: "Select your preferred language."
        }
    },
    tr: {
        common: {
            save: "Kaydet",
            cancel: "İptal",
            delete: "Sil",
            edit: "Düzenle",
            created: "Oluşturuldu",
            updated: "Güncellendi",
            locale_code: "tr",
            copy: "Kopyala",
            copied: "Panoya kopyalandı",
            loading: "Yükleniyor...",
            confirm_delete: "Devam etmek istediğinize emin misiniz?",
            delete_char_confirm: "Silmek istediğinize emin misiniz:",
            sort_newest: "En Yeni",
            sort_oldest: "En Eski",
            no_character: "Karakter Seçilmedi",
            no_characters_found: "Karakter bulunamadı.",
            select_character: "Devam etmek için bir karakter seçin.",
            create_new_character: "Yeni Karakter Oluştur",
            my_characters: "Karakterlerim",
            character: "Karakter",
        },
        nav: {
            dashboard: "Kontrol Paneli",
            profile: "Profil",
            diary: "Günlük",
            timeline: "Zaman Çizelgesi",
            settings: "Ayarlar"
        },
        dashboard: {
            title: "Kontrol Paneli",
            welcome: "RoleBase'e Hoş Geldiniz",
            select_to_begin: "Devam etmek için lütfen bir karakter seçin veya oluşturun.",
            customize: "Düzenle",
            done_editing: "Düzenlemeyi Bitir",
            editing_hint: "Widget'ları sürükleyerek yeniden sıralayın. Boyutlandırmak için her widget üzerindeki kontrolleri kullanın.",
            widgets: {
                id_card: "Kimlik Kartı",
                last_entries: "Son Girdiler",
                quick_actions: "Hızlı İşlemler",
                notes: "Hızlı Notlar",
                ai_chat: "Yapay Zeka"
            },
            id_card: {
                occupation: "Meslek",
                dob: "D. Tarihi",
                signature: "İmza",
                id_class: "Kimlik Sınıfı",
                location: "San Andreas",
                unemployed: "İşsiz",
                unknown: "BİLİNMİYOR"
            },
            quick_actions: {
                new_entry: "+ Girdi",
                new_event: "+ Etkinlik",
                edit: "Düzenle"
            },
            quick_notes: {
                placeholder: "Notlarını buraya yaz..."
            },
            last_entries: {
                no_entries: "Henüz günlük girdisi yok."
            },
            chat: {
                title: "Yapay Zeka Sohbet",
                clear: "Sohbet geçmişini temizle?",
                start: "Şununla bir sohbet başlat:",
                thinking: "Düşünüyor...",
                placeholder: "Mesaj yaz...",
                send: "Gönder",
                error: "Hata: Yapay zeka zihni ile bağlantı kurulamadı."
            }
        },
        profile: {
            title: "Profil",
            edit_profile: "Profili Düzenle",
            save_changes: "Değişiklikleri Kaydet",
            id_info: "Kimlik Bilgileri",
            contact_info: "İletişim & Finans",
            background: "Arkaplan Hikayesi",
            abilities: "Yetenekler & Beceriler",
            traits: "Özellikler",
            fields: {
                name: "Tam Yasal Ad",
                name_placeholder: "örn. John Doe",
                dob: "Doğum Tarihi",
                pob: "Doğum Yeri",
                job: "Meslek / İş",
                family: "Aile / Yakınlar",
                address: "İkamet Adresi",
                phone: "Telefon Numarası",
                bank: "Banka Hesap Numarası",
                story_placeholder: "Karakterinizin hikayesini buraya yazın...",
                no_story: "Henüz bir hikaye yazılmamış."
            },
            traits_sections: {
                personality: "Kişilik",
                physical: "Fiziksel"
            }
        },
        timeline: {
            title: "Zaman Çizelgesi",
            subtitle: "Kronolojik geçmiş:",
            add_event: "Etkinlik Ekle",
            save_event: "Kaydet",
            no_events: "Henüz kaydedilmiş bir etkinlik yok.",
            dialog: {
                add_title: "Zaman Çizelgesi Etkinliği Ekle",
                edit_title: "Etkinliği Düzenle",
                title_label: "Etkinlik Başlığı",
                date_label: "Tarih",
                type_label: "Etkinlik Türü",
                summary_label: "Özet"
            },
            types: {
                personal: "Kişisel",
                business: "İş",
                relationship: "İlişki",
                crime: "Suç"
            }
        },
        diary: {
            title: "Günlük",
            new_entry: "Yeni Girdi",
            search: "Girdilerde ara...",
            no_entries: "Henüz girdi yok. Yazmaya başla!",
            save: "Kaydet",
            generate: "Oluştur",
            title_placeholder: "Girdi Başlığı...",
            select_prompt: "Bir girdi seçin veya yeni bir tane oluşturun.",
            generate_prompt: "Son olaylara dayanarak bugün için bir günlük girdisi yaz. Karakterin sesini ve kişiliğini koru.",
            context_label: "Bağlam / Geçmiş"
        },
        settings: {
            title: "Ayarlar",
            subtitle: "Yapay zeka sağlayıcınızı ve uygulama tercihlerinizi yapılandırın.",
            ai_layer: "Yapay Zeka Katmanı",
            api_key: "API Anahtarı",
            api_key_desc: "Tarayıcınızda yerel olarak saklanır. Sunucularımıza asla gönderilmez.",
            system_persona: "YZ Kişiliği",
            analyze_autofill: "Analiz Et & Doldur",
            analyze_desc: "Bu persona şuna özeldir:",
            select_char_persona: "Persona özelleştirmek için karakter seçin",
            data_management: "Veri Yönetimi",
            import: "Karakter İçe Aktar",
            import_desc: "Takipçiye aktarmak için bir JSON dosyası (örn. yedek) yükleyin.",
            export: "Karakter Dışa Aktar",
            export_desc: "Yedekleme veya aktarım için karakter verilerinizi JSON olarak indirin.",
            click_upload: "Yüklemek için tıkla",
            drag_drop: "veya sürükleyip bırak",
            language: "Dil",
            language_desc: "Tercih ettiğiniz dili seçin."
        }
    }
}
